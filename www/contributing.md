:meta extensions -nl2br headerid
# Contributing

This page contains guidelines for contributing to RiveScript, either for the
core RiveScript language or for one of the primary implementations of RiveScript
(the first-party Perl, Python, Java and JavaScript libraries).

# Core Language

This section is relevant to developers who want to contribute extensions and
features to the core RiveScript scripting language. This means you want to add
a feature to RiveScript that results in a syntax change in the RiveScript
documents, and which will need to be implemented in the first-party RiveScript
libraries.

Unless you are a programmer that is well versed in the languages of Perl,
Python, Java, and JavaScript, contributions to the core RiveScript language
should probably be limited to feature requests. If accepted, I will personally
implement the feature into all of the primary RiveScript libraries.

Before making a feature request, you should understand the goals of RiveScript
and what its intended scope is.

# RiveScript Goals and Scope

The goals and scope of RiveScript:

* **Use the Unix Philosophy:** "A program should do one thing and do it well."
  RiveScript is designed to be a minimalistic, black box reply-fetching core
  component for a chatbot. This is in stark contrast to most implementations of
  AIML in which an "Alicebot" tends to be a complete solution, out of the box,
  head-to-toe for a complete chatbot, including configuration, a user interface
  of some sort, and so on. Alicebots tend to be difficult to separate from their
  AIML parsing code, and one of RiveScript's goals is to avoid that and keep
  the core module lightweight.
* **It should be easy to parse.** One of RiveScript's goals was to be extremely
  easy to develop a parser for it. Again, this is in contrast to AIML which is
  an XML-based language and Perl, in particular, has a difficult time parsing
  it. RiveScript is a plain text, line delimited language for this reason.
* **It should not tie itself down to one programming language.** For example,
  the Python version will never integrate [NLTK](http://www.nltk.org/) and the
  JavaScript version will never integrate
  [wordnet](https://www.npmjs.com/package/wordnet) or
  [ConceptNet](https://github.com/silentrob/conceptnet). Libraries like these
  aren't equally available in multiple programming languages (for example, Perl
  or Java) and would end up tying down RiveScript to a limited set of
  programming language implementations.

**Examples of out-of-scope feature requests:**

Here are some examples of feature requests that I declined to add to the core
RiveScript language or its implementations:

* **Sentence splitting.** Alicebots all have sentence splitting built in
  (separating your input message into an array of sentences using the
  punctuation characters such as `. ; ! ?`). RiveScript won't purport to define
  what a sentence is or how they should be split, and this is extremely trivial
  to implement on your own anyway (split into an array, loop over it and get one
  reply for each sentence, join the replies into an output string).
* **MySQL or any other database system.** This is also outside the scope of
  RiveScript and should be implemented by the chatbot developer. The RiveScript
  libraries all support methods to import and export user variables as
  JSON-serializable data structures; whether your bot saves those datum to the
  hard disk or sticks them in a MySQL table is up to you. RiveScript shouldn't
  be "bloated" by including native support for MySQL or Postgres or
  *insert-your-favorite-dbm-here*.

# Programming Style Guides

This section outlines the programming style of each of the primary
implementations of RiveScript. This section is relevant to any software
developers who want to add features or fix bugs within the first-party
implementations of the RiveScript Interpreter.

In general, use the best practices for the particular programming language,
for example `perlstyle` for Perl, and PEP 8 for Python. Also, check the style
of the existing code and follow it with any new code you write.

It is advised that you configure your text editor to show invisible characters,
such as tabs vs. spaces when indenting your code. Also, make sure that you
remove any trailing whitespaces at the ends of the lines of code.

## JavaScript

* Use tabs for indentation, not spaces. Configure your text editor to display
  tabs with however many spaces you like.
* Configure your text editor to show invisible characters, to further make sure
  that you indent using tabs and not spaces.
* Opening curly brackets always begin on the same line as their statement,
  unlike in C where opening brackets for functions are placed on a new line by itself.
* Always declare variables with var.
* Use `NAMES_LIKE_THIS` for constant values.
* Always use semicolons.
* Use camelCase names, not snake_case.
* Use JSDoc style comments for documentation.

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

JavaScript: <https://github.com/aichaos/rivescript-js>
Java: <https://github.com/aichaos/rivescript-java>
Perl: <https://github.com/aichaos/rivescript-perl>
Python: <https://github.com/aichaos/rivescript-python>

The procedure to contribute a code change is as follows:

1. Fork one of the repositories into your own GitHub account.
2. Check out your copy of the repository by i.e. git clone git@github.com:*your-name*/rivescript-js
3. Work on your code change. Make sure the unit tests pass, and write a new unit test if necessary.
4. Open a [pull request](https://help.github.com/articles/using-pull-requests/) from your repository's branch to aichaos's.
5. If accepted, the pull request will be merged with aichaos's repository.
