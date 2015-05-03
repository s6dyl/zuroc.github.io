cp ~/798/build/* . -R
cp build/798.html index.html
hg addremove
hg ci -m "update"
hg push
