# -*- coding: utf-8 -*-

# Legacy endpoint compatibility for RiveScript.com

from flask import request, redirect, url_for

from rophako.app import app

@app.route("/blog/kirsle/<fid>")
def legacy_blog(fid):
    return redirect(url_for("blog.entry", fid=fid), code=301)


@app.route("/rss.cgi")
def legacy_rss():
    return redirect(url_for("blog.rss"), code=301)


### Static Path Redirects
@app.route("/demo/<path:path>")
@app.route("/files/<path:path>")
def legacy_static(path):
    print request.path
    first = request.path.split("/")[1]
    return redirect("http://static.rivescript.com/{}/{}".format(first, path),
        code=301
    )
