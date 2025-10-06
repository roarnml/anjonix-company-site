import os

def save_directory_structure(root_dir, output_file):
    with open(output_file, "w", encoding="utf-8") as f:
        for dirpath, dirnames, filenames in os.walk(root_dir):
            # Calculate depth for indentation
            level = dirpath.replace(root_dir, "").count(os.sep)
            indent = "      " * level
            # Write directory name
            f.write(f"{indent}{os.path.basename(dirpath)}/\n")
            
            sub_indent = "      " * (level + 1)
            # Write file names
            for filename in filenames:
                f.write(f"{sub_indent}{filename}\n")

# Example usage
root_directory = "."   # e.g., "C:/Users/YourName/Documents"
output_file = "directory_structure.txt"

save_directory_structure(root_directory, output_file)
print(f"Directory structure saved to {output_file}")
