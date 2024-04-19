import React, { useState } from "react";
import "./leftpanel.css";

interface MenuItem {
  name: string;
  description: string;
  price: number | null;
}

const LeftPanel = () => {
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [extractedMenuItems, setExtractedMenuItems] = useState<MenuItem[]>([]);
  function extractMenuItems(
    text: string
  ): { name: string; description: string; price: number | null }[] {
    // Regular expression pattern to match menu item lines with prices
    const menuItemPattern = /^([\w\s]+):\s*(.*?)(?:\s*-\s*\$([\d.]+))?$/gm;

    // Array to store extracted menu items
    const menuItems: {
      name: string;
      description: string;
      price: number | null;
    }[] = [];

    let match;
    while ((match = menuItemPattern.exec(text)) !== null) {
      // Extract the name, description, and price from the matched line
      const name: string = match[1].trim();
      const description: string = match[2].trim();
      const price: number | null = match[3] ? parseFloat(match[3]) : null; // Convert price to a number, if available

      // Create a menu item object and add it to the array
      const menuItem = {
        name,
        description,
        price,
      };
      menuItems.push(menuItem);
    }

    return menuItems;
  }

  const handleExtract = () => {
    let menu = extractMenuItems(text)
    if (menu.length === 0) {
      setError("No valid menu items found.");
      setExtractedMenuItems([]);
    }
    else{
    setExtractedMenuItems(menu);
    setError("");
    console.log("extracted menu", extractedMenuItems);
    }
  };

  return (
    <div className="left_wrapper">
      <div className="top_section">
        {error && <p className="error">{error}</p>}
        <textarea
          placeholder="Type menu item..."
          name="text"
          className="input"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
        <button className="extract_button" onClick={handleExtract}>
          Extract
        </button>
        <p>
          Example input:
          <br />" Starters: -Fresh romaine lettuce with Caesar
          dressing. - $6.99"
        </p>
      </div>
      <div className="list_section">
        <ul className="menu_items">
          <li className="item">
            <span>name</span>
            <span>description</span>
            <span>price</span>
          </li>
          {extractedMenuItems?.map((menu, index) => (
            <li className="item" key={index}>
              <span>{menu.name}</span>
              <span>{menu.description}</span>
              <span>{menu.price}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LeftPanel;
