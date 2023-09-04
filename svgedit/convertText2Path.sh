input_dir=$1
output_dir=$2
mkdir $output_dir
for entry in "$input_dir"/*
do
    echo "${entry##*/}"
    echo "$entry"
    output_file=$output_dir'/'${entry##*/}
    echo $output_file 
    # inkscape --export-plain-svg=$output_file --export-text-to-path $entry
done