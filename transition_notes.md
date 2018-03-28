# Overview
The place I've been storing online content since 2006 is closing as of September 2018. The format is a text-based markeup without a directory structure. I might was to re-host so I need to translate into a new format, e.g., markdown, and then get it re-hosted.

I already have a paid git hub account, so my first attempts are going to be to put something there.

Initially I grabbed an extract of the entire space. I'm picking up JavaScript again and playing around with NodeJS, so it seems like a natrual idea to use Node to make the transition rather than Java/C++/Groovy/Powershell - though all of those might be interesting.

As a side note, I have an Ubuntu 16.04 desktop VM I've creted for working with Node, so that's what I'll be using.

I'm also using vim a bit more. I decided to add a markdown viewer. I came across livedown.vim, so that's what I'm starting with: [https://github.com/shime/vim-livedown].

I already am using vundle, so to install the vim plugin:
Add line to ~/.vimrc: 
Plugin 'git://github.com/shime/vim-livedown.git'

Removed one code formatter, and installed another: [https://github.com/Chiel92/vim-autoformat]
# Early beginnings
After the initial extract, my first idea is create a node project that copies "from" a directory "to" another directory and then put that code into github.

