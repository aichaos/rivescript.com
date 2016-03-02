:meta extensions -nl2br headerid
# History of RiveScript

This briefly goes over the history of RiveScript and why it was created. This
is mostly an account of Noah's experience with chatbots.

The **tl;dr.** is that RiveScript exists because I couldn't use AIML from Perl.

## SmarterChild and RunABot

The story starts around the year 2000.

I first got interested in chatbots that carry on conversations when I discovered
the AOL Instant Messenger bot, [SmarterChild](https://en.wikipedia.org/wiki/SmarterChild).
It was a bot developed by ActiveBuddy which would chat with people in plain English
and provided a handful of features (such as looking up weather reports or movie
showtimes) which could be invoked with questions such as, "what is the weather
like in Los Angeles?"

Not long after this, I discovered the (now defunct) bot hosting service,
**RunABot.** This service enabled users to create their own AIM chatbots using
a web-based interface for creating its replies. Users would sign on the bot by
downloading a client program. Under the hood, RunABot used a variant of AIML as
their scripting language. It appears to have been AIML v0.9, but some of the tag
syntax was non-standard. RunABot would allow you to export your bot's brain as
AIML code for offline editing, and you could then re-upload your changed code.

RunABot had a free service, where you could configure **one** AIM bot, and a
paid service that would allow multiple AIM bots (aliases) and additionally allow
users to run bots on MSN Messenger.

Another important aspect of RunABot was that botmasters could choose a "base brain"
for their bot, with options being [Alice](https://en.wikipedia.org/wiki/Artificial_Linguistic_Internet_Computer_Entity)
and [Eliza](https://en.wikipedia.org/wiki/ELIZA). If your bot's own replies couldn't
answer a user's message, it would fall back to the base brain instead. Alice provided
at least 40,000 replies and Eliza significantly fewer. Whenever the RunABot
servers were under heavy load, *free bots would revert to Eliza.*

## Alicebot Program D

Because of RunABot's restrictions on free accounts (and because I was too young
to buy a paid account), I discovered [Alicebot Program D](http://www.alicebot.org/downloads/programs.html),
a Java bot that used AIML and connected bots to AIM, ICQ, and IRC. The ICQ support
didn't work, as ICQ had switched to the same protocol as AIM and Program D was
built around the old protocol.

Some of the pros of Program D included: using the official version of AIML, the
AIM bot replied instantly to messages instead of having a couple seconds delay,
and I wasn't reliant on an external hosting service. The down sides were that the
bot would reply instantly on AIM (sometimes tripping the rate limit if it's chatting
with more than a couple people), and it had no built-in protection for AIM's
"Warning" system.

On AIM, you could "warn" users which would put a percentage next
to their screen name and would negatively impact their rate limit. It was intended
to be used against abusive (spammy) users, but people would oftentimes warn chatbots
just to be mean, and it would affect the bot's ability to carry on conversations
with a lot of people.

RunABot's network would handle warns by globally "blocking" the user from
chatting with any bot hosted by RunABot; the bots would simply stop responding
to any messages from that user.

## MSN Messenger Bots and Perl

Eventually, I wanted to run a chatbot on MSN Messenger instead of only being
limited to AIM and IRC. RunABot would only provide MSN bots to paid users,
because MSN had no rate limiting system and a bot would be able to serve many
more users simultaneously (and therefore putting even more load on RunABot's
servers).

Since I was still too young to just buy a RunABot premium account, I turned to
Google to find a way to run my own MSN bots. I found a site called WiredBots
(now defunct), which provided extremely minimalistic barebones chatbot programs
written in Perl which would connect a bot to MSN and AIM (separately; not in
the same Perl script).

These bots were *extremely* minimalistic. They would respond to all incoming
messages by sending a random line of text from a file. There was no A.I. logic
to them at all. I used these bot templates to write my own bots, and learn how
to program in Perl in the mean time (Perl is my first programming language for
this very reason!)

## Various Perl Bots

I iterated again and again on my Perl chatbot codebase, oftentimes starting
over from scratch to write the foundation of the bots better from the ground
up. Some of the later bots I wrote are archived on the
[AiChaos Graveyard](https://github.com/aichaos/graveyard) GitHub repo.

The earliest bots I wrote would learn how to reply by allowing users to teach
it things. A user would type a command like, `/learn hello bot::Hello human!`
to teach the bot how to respond to the message "hello bot." As I got further
into chatbot development, though, I needed something more along the lines of
AIML to build better chatbot personalities.

There was a Perl implementation of an Alicebot called
[Program V](https://github.com/kirsle/programv). It was built for Perl 5.6, and
it already had trouble running on Perl 5.8; I was too inexperienced with the
language to fix its issues and get it to run. Additionally, all of the AIML
logic is tightly bundled with the rest of the program, making it difficult to
extract the AIML bits and use them in my own program. (I've since dusted off
Program V and made it runnable on modern Perl; the link goes to my GitHub repo
that includes my changes).

Unable to use the `AIML::Parser` modules from Program V, I attempted to write
my own parsers using various Perl modules like `XML::Simple` (woefully
inadequate for this purpose) and `XML::Parser` (which didn't work because it
would explode the `<template>` nodes into a tree of all its sub-tags with no
way to tell which order each tag appeared in the raw template).

Eventually I gave up trying to parse AIML code and started writing my own weird
"dialects" which were easier to parse using plain regular expressions instead
of being valid XML code.

One of these weird dialects (imaginatively called ChaosML) looked like this:

```xml
<cml version="1.0">

<category>
Input: WHAT IS THE DATE|WHAT IS TODAY|WHAT TIME IS IT
Reply: The current time and date is: <date>.
</category>

<category>
Input: WHAT IS TIME
Reply: The current number of seconds is: <time>.
</category>

</cml>
```

## Chatbot::Alpha

I eventually gave up trying to make an AIML-lookalike language and decided to
just keep it simple. I called my new language Alpha, and put it under the
Perl module namespace `Chatbot`, as there was already a module called
`Chatbot::Eliza` which implemented Eliza.

The syntax for the Alpha language was inspired by
[BuddyScript](https://en.wikipedia.org/wiki/BuddyScript), the scripting
language that powered SmarterChild and other ActiveBuddy bots.

The "hello bot" example of RiveScript is actually also valid BuddyScript code:

```
+ hello bot
- Hello human.
```

The similarities quickly diverge from there, though, but that basic idea for
the syntax was the foundation of Alpha. I wanted it to be plain text and super
easy to parse from any programming language, with minimal XML-like tags
involved. The language did have some XML-like tags, but the scope of these were
kept simple enough that they could be handled with regular expressions.

Some weird quirks with Alpha were that the `+Trigger` command would use the
"simplified regular expressions" similar to RiveScript, and there was a
`~Regexp` command where you could instead provide a raw regular expression.
For executing dynamic Perl code in-line, there were `#Code` commands that
would evaluate Perl code one line at a time.

Alpha was a very simplistic language, but it wasn't programmed in the most
efficient way possible. Adding complicated logic, such as an analog for the
`<that>` tag from AIML (`%Previous` in RiveScript) would have been too much
trouble to add, so I started again from scratch.

## Chatbot::RiveScript

The first module to finally use the RiveScript name was called
`Chatbot::RiveScript`. It's an evolution of Alpha, rewritten from the ground
up, with a list of features in mind to address the shortcomings of Alpha.

The `~Regexp` command was removed and object macros replaced the `#Code`
command. RiveScript quickly matched and then surpassed the feature set of
AIML 1.x.

For the 1.00 stable release of RiveScript (after about a year in development),
I requested my own root namespace on [CPAN](http://www.cpan.org/) and was able
to call my module simply `RiveScript`.

## The (Messenger) Chatbot Drought

Years went by before any new bugs in the module were reported, and the version
eventually crept up to v1.02 and stayed there. The chatbot scene started
experiencing a drought of interest; a popular chatbot forum called Bot-Depot
was losing all its best members and nobody was actively developing bots there
anymore. All that was left were the occasional newbies asking questions that
nobody would answer.

So, in 2005 I lost interest in furthering the development of RiveScript.

Three years later, somebody in a programming forum posted a thread asking about
learning Perl. I asked why they wanted to learn Perl (for CGI development?
offline programming?) so I could send a link to the appropriate tutorials,
and he said he wanted to learn it because he heard he could program bots with
it. That inspired me to dust off the old RiveScript module and fix it up.

## RiveScript 2.0

I registered the domain name RiveScript.com so that there'd be an official
website for RiveScript. I decided to come up with a new standard for RiveScript;
learning from the limitations of the old version and how it relied too much on
Perl, the new standard was written with multiple implementations in mind.

I published the [RiveScript 2.0 Working Draft](/wd/RiveScript.html), a document
describing the language from an implementation-agnostic point of view. It
describes how RiveScript itself should work -- it's up to the programmer to
implement it. The new standards raised the bar over what the old version was
capable of, and I began development of a new RiveScript module from scratch to
meet the new standards.

## Various Implementations

RiveScript was still a Perl-only module, but after completing it I started to
branch out and implement it in other programming languages as well. This was
both to expand RiveScript's user base (go where the developers are) and as a
personal exercise to learn the ropes with new programming languages.

The first new implementation was written in 2010 in Java, because I liked the
idea of making a RiveScript-powered app for Android. The next version was
written in Python in 2012, purely for learning how to program in Python.

Also in 2012 I wrote a JavaScript implementation to make RiveScript embeddable
in web pages and to add the [Node.js](https://nodejs.org/) community to the
pool of potential users of my language. Finally, in 2015 I implemented
RiveScript in Go, which will eventually open the door to making RiveScript
available to many more programming languages when Go finalizes their C shared
object API.

# Side Story: AiChaos and the RiveScript Name

![AiChaos Logo](https://static.rivescript.com/ui/glow.png)

From my RunABot days, one of the bots that I ran was named Chaos. I kept the
bot with that name all through the above history through `Chatbot::RiveScript`.

When I started programming my own bots in Perl, I made a website named
"Chaos A.I. Technology" that I then renamed to AiChaos, named after my bot.

I started to like the word "rive" (*v. to tear or rend apart*). By some stretch
of the imagination it fit with the AiChaos name, and I used that word for a
couple other bot projects along the way including a bot that would learn all of
its replies autonomously (similar to [Cleverbot](https://en.wikipedia.org/wiki/Cleverbot)).

The AiChaos logo, above, was designed by me somewhere around 2004. I liked the
Biohazard symbol and wanted something aesthetically similar to be used for
chatbots, and came up with that. The logo was prominently used on the old
AiChaos website, and lives on in RiveScript's site as its favorites icon.

