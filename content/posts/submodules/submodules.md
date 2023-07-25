---
title: "I HATE Git Submodules"
date: 2023-07-24
description: "I REALLY hate submodules"
type: "post"
tags: ["blog", "rant", "joke"]
image: "/images/submodules.png"
---

Okay, I really would have preferred the second post on this blog not be an unprofessional rant however I fell very heavily about this:

### I HATE GIT SUBMODULES!!!

When I first created this site, this website had a solid off-black background so I wanted to add the current interactive grid that you see before you to make it a little bit more *juicy*.

However, what I did not know (this was my first experience using gitmodules), is that if you changed the code in a file from the gitmodule you would not be able to commit those changes to git because it would try to commit the changes to the original github repo that the gitmodule belongs to. So I needed to fork the theme's repo. However, the repo was still using the old gitmodule so I spent a total of ***TWO HOURS*** removing and adding git modules, removing lines from my git configs. It was hell

![Submodules](/content/posts/submodules/submodules.png)
Torvalds what have you created?

Toodles
    - Tayler
