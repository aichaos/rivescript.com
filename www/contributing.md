:meta extensions -nl2br headerid
# Contributing

This page contains guidelines for contributing to RiveScript, either for the
core RiveScript language or for one of the primary implementations of RiveScript
(the first-party Perl, Python, Java, JavaScript and Go libraries).

# Core Language

This section is relevant to developers who want to contribute extensions and
features to the core RiveScript scripting language. This means you want to add
a feature to RiveScript that results in a syntax change in the RiveScript
documents, and which will need to be implemented in the first-party RiveScript
libraries.

Unless you are a programmer that is well versed in the languages of Perl,
Python, Java, JavaScript and Go, contributions to the core RiveScript language
should probably be limited to feature requests. If accepted, I will personally
implement the feature into all of the primary RiveScript libraries.

Before making a feature request, you should understand the goals of RiveScript
and what its intended scope is.

# RiveScript Goals and Scope

The goals and scope of RiveScript:

* **Use the Unix Philosophy:** *"A program should do one thing and do it well."*
  RiveScript is designed to be a minimal "black box" reply engine for writing
  a chat bot. This is in stark contrast to most implementations of AIML, in which an
  *Alicebot* tends to be a full application out of the box including
  configuration, a user interface of some kind (whether a built-in web server,
  client connections to instant messenger platforms, or a desktop graphical
  UI), and so on.

    Alicebots tend to be difficult to separate from their AIML parsing/replying
    code, and one of RiveScript's goals is to avoid that and keep the core module
    lightweight and simple.

* **The language should be easy to parse.** One of RiveScript's goals was to be
  extremely easy to develop a parser for it. Again, this is in contrast to AIML
  which is a non-structured XML language that many developers find difficult to
  write effective parsers for in many programming languages. RiveScript is a
  plain text, line-delimited language that can be parsed using simple `split()`
  operations and regular expressions.

* **It should not tie itself down to one programming language.** For example,
  the Python version will never integrate [NLTK](http://www.nltk.org/) and the
  JavaScript version will never integrate [wordnet](https://www.npmjs.org/package/wordnet)
  or [ConceptNet](https://github.com/silentrob/conceptnet). Libraries like these
  are not equally available in multiple programming languages and would end up
  tying down RiveScript to a limited set of programming language implementations.

* **RiveScript's behavior should be consistent across implementations.** As much
  as possible, all of the RiveScript implementations in any programming language
  should support the same feature set (per the Working Draft) and bots running
  on them should behave the same.

    Occasionally the implementations may drift apart due to varying popularity in
    programming languages and contributions from outside developers, but these
    features should be additive in nature (going above and beyond the Working
    Draft spec) and not change core behaviors that would cause a RiveScript
    personality to behave differently depending on programming language.

* **The RiveScript personality should maintain full control of itself.** The
  RiveScript language provides features for a bot personality (a collection of
  RiveScript source documents) to *fully* describe itself and its configuration.
  For example, bot variables (like the bot's name, age and location) are defined
  in RiveScript source code, as well as substitution patterns and how multi-line
  commands are concatenated together.

    This, again, is in contrast to Alicebots which tend to store configuration in
    a separate location from the AIML reply files. With RiveScript, it should
    remain possible to just take a directory full of `*.rive` files from one
    program to another (even across different programming languages) and have the
    bot personality behave identically with regards to how it modifies user messages
    (substitutions), how its triggers match users' messages, and how its replies
    are formatted (with regards to `^Continue` commands when a reply needs to
    span multiple lines in source code).

### Examples of out-of-scope feature requests

Here are some examples of feature requests that I declined to add to the core
RiveScript language or its implementations:

* **Sentence splitting.** Alicebots all have sentence splitting built in
  (separating your input message into an array of sentences using the
  punctuation characters such as `. ; ! ?`). RiveScript won't purport to define
  what a sentence is or how they should be split, and this is extremely trivial
  to implement on your own anyway (split into an array, loop over it and get one
  reply for each sentence, join the replies into an output string).

* **MySQL or any other database system.** The core libraries will not ship with
  built-in support for any particular database engine; this is outside the scope
  of RiveScript and should be implemented by the chatbot developer.

    All of the RiveScript implementations provide methods to export and import
    user variables as JSON-serializable data structures, so you can use these
    methods and persist data in any way that you wish.

    Note that there *may* be "official" drivers to support databases included in
    the source code repository of some RiveScript implementations, but these are
    shipped as separate, optional, packages. This decision is related to RiveScript's
    goal of being small and lightweight; for example, if the core library supported
    a bunch of database engines, then users installing the library would necessarily
    have to install dependencies for MySQL, Redis, PostgreSQL, MongoDB, or
    *insert your favorite DBM here* regardless of whether they wanted them or not.

    By keeping database engines out of the RiveScript core, the library can stay
    small, with minimal dependencies, and without any opinions.

# Contributing Examples

Perhaps the easiest thing to contribute to the RiveScript libraries are examples
of how to use it in various circumstances. For example, the JavaScript library
includes an example [Slack bot](https://github.com/aichaos/rivescript-js/tree/master/eg/slack-bot)
and others in its [examples](https://github.com/aichaos/rivescript-js/tree/master/eg)
directory.

Examples should follow these guidelines:

* Keep them small and focused. A developer should be able to quickly read the
  source code and understand the concepts that the example is trying to convey.
* Keep them self-contained in one folder. They can have sub-folders, and they
  can refer to the common RiveScript example brain, but if they introduce any
  outside dependencies they should keep everything contained in one root folder.
  A good example is the [Slack bot](https://github.com/aichaos/rivescript-js/tree/master/eg)
  in RiveScript-JS; it adds a dependency on `slack-client` from NPM, and it
  keeps track of it in its own `package.json` file.

# Programming Style Guides

This section outlines the programming style of each of the primary
implementations of RiveScript. This section is relevant to any software
developers who want to add features or fix bugs within the first-party
implementations of the RiveScript Interpreter.

In general, use the best practices for the particular programming language,
for example [perlstyle](http://perldoc.perl.org/perlstyle.html) for Perl,
and [PEP 8](https://www.python.org/dev/peps/pep-0008/) for Python. Also, check
the style of the existing code and follow it with any new code you write.

It is advised that you configure your text editor to show invisible characters,
such as tabs vs. spaces when indenting your code. Also, make sure that you
remove any trailing whitespaces at the ends of the lines of code.

## CoffeeScript

* Use 2 (two) spaces for indentation, not tab characters.
* Configure your text editor to show invisible characters, to further make sure
  that you indent using spaces and not tabs.
* Use `NAMES_LIKE_THIS` for constant values.
* Use camelCase names, not snake_case.
* Use JSDoc style comments for documentation:
    * The first line of the comment block begins with two comment characters: `##`
    * Each subsequent line begins with one comment character: `#`
    * The first part of the comment block contains the function definition
      prototype, with data types like `string` and `int` and such.
    * One blank line between the function prototype and the documentation.
    * Document the function using Markdown syntax.
    * End the comment block with two comment characters: `##`
    * Any subsequent comment that isn't a part of the documentation block must
      be separated from the block by at least one non-comment line (either a
      blank line or CoffeeScript code).

## Go

* Use [go fmt](https://blog.golang.org/go-fmt-your-code) and run your code
  through the `gofmt` command before submitting any pull requests.

## Java

* Use tabs for indentation, not spaces. Configure your text editor to display
  tabs with however many spaces you like.
* Configure your text editor to show invisible characters, to further make sure
  that you indent using tabs and not spaces.
* Opening curly brackets always begin on the same line as their statement,
  unlike in C where opening brackets for functions are placed on a new line by
  itself.

## Perl

* Follow the Perl Best Practices laid out in [perldoc perlstyle](http://search.cpan.org/perldoc?perlstyle).
* Use tabs for indentation, not spaces. Configure your text editor to display
  tabs with however many spaces you like.
* Configure your text editor to show invisible characters, to further make sure
  that you indent using tabs and not spaces.
* Opening curly brackets always begin on the same line as their statement,
  unlike in C where opening brackets for functions are placed on a new line by itself.
* Follow POD best practices in documentation.
    * Verbatim code blocks are indented with 2 spaces.

## Python

* Follow the Python Best Practices laid out in [PEP 8](https://www.python.org/dev/peps/pep-0008/).
* Use 4 (four) spaces for indentation, not tab characters.
* Configure your text editor to show invisible characters, to further make
  sure that you indent using spaces and not tabs.
* Lines should generally not be longer than 80 characters per PEP 8, but if a
  line does exceed 80 characters and it's more readable that way (as opposed to
  breaking it across multiple lines), allow it to be longer than 80 characters.

# Contributing Code Changes

The primary implementations of RiveScript are all managed by the Git version
control system and are hosted on GitHub at the following addresses:

* Go: <https://github.com/aichaos/rivescript-go>
* JavaScript: <https://github.com/aichaos/rivescript-js>
* Java: <https://github.com/aichaos/rivescript-java>
* Perl: <https://github.com/aichaos/rivescript-perl>
* Python: <https://github.com/aichaos/rivescript-python>

The procedure to contribute a code change is as follows:

1. Fork one of the repositories into your own GitHub account.
2. Check out your copy of the repository by i.e. git clone git@github.com:*your-name*/rivescript-js
3. Work on your code change. Make sure the unit tests pass, and write a new unit test if necessary.
4. Open a [pull request](https://help.github.com/articles/using-pull-requests/) from your repository's branch to aichaos's.
5. If accepted, the pull request will be merged with aichaos's repository.
