# RiveScript.com

![Glow](https://raw.githubusercontent.com/kirsle/rivescript.com/master/www/ui/glow.png)![Logo](https://raw.githubusercontent.com/kirsle/rivescript.com/master/www/ui/logo.png)

This is the source code of the [RiveScript.com](http://www.rivescript.com/)
website. It runs on top of my Python CMS called
[Rophako](https://github.com/kirsle/rophako).

## Hacking

Because of the separation of concerns between Rophako the CMS and the front-end
files of the website it runs, there is a `bootstrap.py` script that will
automatically configure Rophako for a local dev environment of RiveScript.com.

Just run `python3 bootstrap.py` and you'll be up and running in no time. After
the initial automatic configuration, running `bootstrap.py` again acts as an
easy shortcut to running Rophako's server script.
