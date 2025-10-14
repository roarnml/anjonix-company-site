import os

# Directories whose subdirectories should be hidden
HIDDEN_DIRS = {"node_modules", ".trunk", ".git"}

def build_tree(start_path='.', indent=''):
    lines = []
    try:
        entries = sorted(os.listdir(start_path))
    except PermissionError:
        lines.append(f"{indent}└── [Permission Denied]")
        return lines

    for i, entry in enumerate(entries):
        path = os.path.join(start_path, entry)
        connector = '├── ' if i < len(entries) - 1 else '└── '

        if os.path.isdir(path):
            if entry in HIDDEN_DIRS:
                lines.append(f"{indent}{connector}{entry}/ [contents hidden]")
                continue

            lines.append(f"{indent}{connector}{entry}/")
            new_indent = indent + ('│   ' if i < len(entries) - 1 else '    ')
            lines.extend(build_tree(path, new_indent))
        else:
            lines.append(f"{indent}{connector}{entry}")
    return lines

if __name__ == '__main__':
    start_dir = os.getcwd()
    tree_lines = ['.'] + build_tree(start_dir)

    output_file = os.path.join(start_dir, 'project_structure1.txt')

    # Write to file
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write('\n'.join(tree_lines))

    # Print to terminal
    print('\n'.join(tree_lines))
    print(f"\n✅ Project structure saved to: {output_file}")
