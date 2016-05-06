:meta extensions -nl2br headerid
# Help with Try RiveScript Online

The "Try RiveScript Online" page is a way to test out RiveScript directly in your
web browser without needing to download anything.

It embeds the latest version of the JavaScript implementation of RiveScript.

## How to Use It

On the main page is a large text area for you to write RiveScript code in. By
default, this box is pre-populated with the contents of the `rs-standard.rive`
template -- this is the standard set of RiveScript replies that ship with most
of the primary implementations, all condensed into one file.

To get started immediately you can simply click on the "Execute/Test Script"
button, which will open a modal for you to chat with the bot using the reply
data from that text area. You can close the modal and edit the code more and
then click the button again to test out your new changes.

## Templates

Above the text area there's a drop-down box labeled "Templates." Selecting one
of these templates will replace the contents of the text area with the content
of the template file you selected.

The templates are numbered and ordered with the most simple templates on top
and the more complicated ones at the bottom. They roughly follow the order of
steps that the [Tutorial](/docs/tutorial) follows.

Two of the special templates are `rs-standard.rive` which contains the entirety
of the standard example brain that ships with RiveScript, and `testsuite.rive`
which is a file that intends to test every feature of RiveScript. In the test
suite you'd read the comments above each trigger to see how it works and what
the expected results are.

## Object Macros

This page uses the JavaScript version of RiveScript and it therefore supports
JavaScript (and CoffeeScript) object macros. Note that these will run from the
context of your web browser, so you can't import Node modules like you'd be
able to if you were running RiveScript from a Node app.

Here is an example to get you started. Paste this into the text area on the
Try Online page:

```
+ reverse *
- Okay... <call>reverse <star></call>

> object reverse javascript
    var words = args.join(" ");
    return words.split("").reverse().join("");
< object

+ is * your master
- "<formal> is my master" is a <call>isMaster <star></call> statement.

> object isMaster coffeescript
    name = args.join " "
    return if name is "kirsle" then "true" else "false"
< object
```

When you test the script, something like the following should be able to work:

```
User: reverse hello robot
Bot: Okay... tobor olleh

User: is kirsle your master?
Bot: "Kirsle is my master" is a true statement.

User: is soandso your master?
Bot: "Soandso is my master" is a false statement.
```
