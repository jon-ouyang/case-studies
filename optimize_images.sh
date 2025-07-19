#!/bin/bash

# Script to optimize large images in the portfolio
cd cdn.myportfolio.com/c2b2a835-d311-4a23-bad7-640471e2b176/

# Create backup directory
mkdir -p backup_large_images

# List of the largest files to optimize (over 2MB)
large_files=(
    "de1546ce-78d7-459d-9900-12505f27df43ffac.png"
    "de1546ce-78d7-459d-9900-12505f27df43_rw_384035c8.png"
    "4834ac54-16c9-4b0d-9869-feab09280850780a.jpg"
    "d48e039d-9014-48aa-992b-a34de17e34e4_rw_3840331c.png"
    "d48e039d-9014-48aa-992b-a34de17e34e413e9.png"
    "88cf10ad-46ea-4a18-8b80-088f2ac81d98_rw_3840be6d.png"
    "88cf10ad-46ea-4a18-8b80-088f2ac81d98d6b9.png"
    "4834ac54-16c9-4b0d-9869-feab09280850_rw_3840bd0d.jpg"
    "73b4eee2-1521-4bd4-b889-22064eb1af3d4221.jpg"
    "6535b813-b0e9-407e-b3c8-91c806c6f3ecab21.jpg"
)

echo "Optimizing large images..."

for file in "${large_files[@]}"; do
    if [ -f "$file" ]; then
        echo "Processing: $file"
        
        # Get original size
        original_size=$(du -h "$file" | cut -f1)
        
        # Backup original
        cp "$file" "backup_large_images/"
        
        # Get file extension
        extension="${file##*.}"
        
        if [ "$extension" = "png" ]; then
            # Optimize PNG with sips (convert to JPEG for better compression)
            sips -s format jpeg -s formatOptions 60 "$file" --out "${file%.png}.jpg"
            if [ $? -eq 0 ]; then
                rm "$file"
                mv "${file%.png}.jpg" "$file"
            fi
        elif [ "$extension" = "jpg" ] || [ "$extension" = "jpeg" ]; then
            # Recompress JPEG with lower quality
            sips -s format jpeg -s formatOptions 70 "$file" --out "${file%.jpg}_temp.jpg"
            if [ $? -eq 0 ]; then
                rm "$file"
                mv "${file%.jpg}_temp.jpg" "$file"
            fi
        fi
        
        # Get new size
        new_size=$(du -h "$file" | cut -f1)
        echo "  Original: $original_size -> New: $new_size"
    else
        echo "File not found: $file"
    fi
done

echo "Optimization complete!"
