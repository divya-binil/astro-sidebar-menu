import fs from "fs";
import path from "path";

function generateMenuData(basePath, directory = "") {
  const menuData = [];

  // Read the contents of the base directory
  const files = fs.readdirSync(basePath);

  // Filter out directories
  const directories = files.filter((file) =>
    fs.statSync(path.join(basePath, file)).isDirectory()
  );

  // Filter out Markdown files (add more extensions as needed)
  const markdownFiles = files.filter(
    (file) => file.endsWith(".md") || file.endsWith(".mdx")
  );

  // Create menu items for each directory
  directories.forEach((dir) => {
    const subPath = path.join(basePath, dir);
    const submenus = generateMenuData(subPath, path.join(directory, dir)); // Pass the updated directory

    menuData.push({
      label: dir,
      submenus: submenus.length > 0 ? submenus : undefined,
    });
  });

  // Include Markdown files as menu items
  markdownFiles.forEach((file) => {
    const label = file.replace(/\.(md|mdx)$/, ""); // Use the file name without the extension as the label
    menuData.push({
      label,
      url: path.join("/", directory.replace(basePath, ""), label),
    });
  });

  return menuData;
}

export default generateMenuData;
