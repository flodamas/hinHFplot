
outf=plotpreset.js
. title.shinc 

for i in `ls -d xmls/*` ; do echo $i >> sorttemp.txt ; done

echo 'var plotpreset = {" ": { title: "Examples", xmlset: ""}};' > $outf
for i in `sort -f sorttemp.txt`
do
    key=${i##*/} ; key=${key%%.*}
    
    [[ x$(gettitle $key) == x ]] && { echo -e "\e[31m(x) $key\e[0m" ; continue ; } || echo -e "\e[32m(o) $key\e[0m"
    
    echo -n '
plotpreset["'$key'"] = {
    title: "'$(gettitle $key)'",
    xmlset: "' >> $outf
    echo -n $(tr -d '\n' < $i) >> $outf
    # cat $i >> $outf
    echo '"};' >> $outf
done

rm sorttemp.txt
