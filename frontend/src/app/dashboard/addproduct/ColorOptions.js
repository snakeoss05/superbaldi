import React, { useState } from "react";

const ColorOptions = ({ setColorInput, colorInput }) => {
  const colors = [
    { colorName: "Red", code: "#FF0000" },
    { colorName: "Blue", code: "#0000FF" },
    { colorName: "Green", code: "#008000" },
    { colorName: "Yellow", code: "#FFFF00" },
    { colorName: "Orange", code: "#FFA500" },
    { colorName: "Purple", code: "#800080" },
    { colorName: "Pink", code: "#FFC0CB" },
    { colorName: "Black", code: "#000000" },
    { colorName: "White", code: "#FFFFFF" },
    { colorName: "Gray", code: "#808080" },
    { colorName: "Brown", code: "#A52A2A" },
    { colorName: "Teal", code: "#008080" },
    { colorName: "Navy", code: "#000080" },
    { colorName: "Maroon", code: "#800000" },
    { colorName: "Olive", code: "#808000" },
    { colorName: "Lime", code: "#00FF00" },
    { colorName: "Cyan", code: "#00FFFF" },
    { colorName: "Magenta", code: "#FF00FF" },
    { colorName: "Silver", code: "#C0C0C0" },
    { colorName: "Gold", code: "#FFD700" },
    { colorName: "Crimson", code: "#DC143C" },
    { colorName: "Coral", code: "#FF7F50" },
    { colorName: "Salmon", code: "#FA8072" },
    { colorName: "Tomato", code: "#FF6347" },
    { colorName: "Firebrick", code: "#B22222" },
    { colorName: "DarkRed", code: "#8B0000" },
    { colorName: "LightCoral", code: "#F08080" },
    { colorName: "IndianRed", code: "#CD5C5C" },
    { colorName: "MediumVioletRed", code: "#C71585" },
    { colorName: "DeepPink", code: "#FF1493" },
    { colorName: "HotPink", code: "#FF69B4" },
    { colorName: "PaleVioletRed", code: "#DB7093" },
    { colorName: "LightPink", code: "#FFB6C1" },
    { colorName: "DarkMagenta", code: "#8B008B" },
    { colorName: "Orchid", code: "#DA70D6" },
    { colorName: "Violet", code: "#EE82EE" },
    { colorName: "Plum", code: "#DDA0DD" },
    { colorName: "Thistle", code: "#D8BFD8" },
    { colorName: "Lavender", code: "#E6E6FA" },
    { colorName: "MediumSlateBlue", code: "#7B68EE" },
    { colorName: "SlateBlue", code: "#6A5ACD" },
    { colorName: "DarkSlateBlue", code: "#483D8B" },
    { colorName: "MediumBlue", code: "#0000CD" },
    { colorName: "RoyalBlue", code: "#4169E1" },
    { colorName: "DodgerBlue", code: "#1E90FF" },
    { colorName: "DeepSkyBlue", code: "#00BFFF" },
    { colorName: "LightSkyBlue", code: "#87CEFA" },
    { colorName: "SkyBlue", code: "#87CEEB" },
    { colorName: "LightBlue", code: "#ADD8E6" },
    { colorName: "PowderBlue", code: "#B0E0E6" },
    { colorName: "SteelBlue", code: "#4682B4" },
    { colorName: "LightSteelBlue", code: "#B0C4DE" },
    { colorName: "CornflowerBlue", code: "#6495ED" },
    { colorName: "DarkTurquoise", code: "#00CED1" },
    { colorName: "MediumTurquoise", code: "#48D1CC" },
    { colorName: "LightSeaGreen", code: "#20B2AA" },
    { colorName: "DarkCyan", code: "#008B8B" },
    { colorName: "Aqua", code: "#00FFFF" },
    { colorName: "LightCyan", code: "#E0FFFF" },
    { colorName: "PaleTurquoise", code: "#AFEEEE" },
    { colorName: "Aquamarine", code: "#7FFFD4" },
    { colorName: "MediumAquamarine", code: "#66CDAA" },
    { colorName: "DarkSeaGreen", code: "#8FBC8F" },
    { colorName: "MediumSeaGreen", code: "#3CB371" },
    { colorName: "SeaGreen", code: "#2E8B57" },
    { colorName: "ForestGreen", code: "#228B22" },
    { colorName: "DarkGreen", code: "#006400" },
    { colorName: "LimeGreen", code: "#32CD32" },
    { colorName: "LawnGreen", code: "#7CFC00" },
    { colorName: "Chartreuse", code: "#7FFF00" },
    { colorName: "GreenYellow", code: "#ADFF2F" },
    { colorName: "YellowGreen", code: "#9ACD32" },
    { colorName: "OliveDrab", code: "#6B8E23" },
    { colorName: "DarkOliveGreen", code: "#556B2F" },
    { colorName: "Goldenrod", code: "#DAA520" },
    { colorName: "DarkGoldenrod", code: "#B8860B" },
    { colorName: "SaddleBrown", code: "#8B4513" },
    { colorName: "Sienna", code: "#A0522D" },
    { colorName: "Chocolate", code: "#D2691E" },
    { colorName: "Peru", code: "#CD853F" },
    { colorName: "SandyBrown", code: "#F4A460" },
    { colorName: "BurlyWood", code: "#DEB887" },
    { colorName: "Tan", code: "#D2B48C" },
    { colorName: "RosyBrown", code: "#BC8F8F" },
    { colorName: "Moccasin", code: "#FFE4B5" },
    { colorName: "NavajoWhite", code: "#FFDEAD" },
    { colorName: "PeachPuff", code: "#FFDAB9" },
    { colorName: "MistyRose", code: "#FFE4E1" },
    { colorName: "LavenderBlush", code: "#FFF0F5" },
    { colorName: "Linen", code: "#FAF0E6" },
    { colorName: "OldLace", code: "#FDF5E6" },
    { colorName: "PapayaWhip", code: "#FFEFD5" },
    { colorName: "SeaShell", code: "#FFF5EE" },
    { colorName: "MintCream", code: "#F5FFFA" },
    { colorName: "Honeydew", code: "#F0FFF0" },
    { colorName: "Azure", code: "#F0FFFF" },
    { colorName: "AliceBlue", code: "#F0F8FF" },
    { colorName: "GhostWhite", code: "#F8F8FF" },
    { colorName: "Snow", code: "#FFFAFA" },
    { colorName: "Ivory", code: "#FFFFF0" },
  ];

  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (color) => {
    setColorInput(color);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full">
      <div
        style={{
          padding: "8px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          cursor: "pointer",
        }}
        onClick={() => setIsOpen(!isOpen)}>
        {colorInput ? (
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                backgroundColor: colorInput.code,
                width: "16px",
                height: "16px",
                borderRadius: "50%",
                marginRight: "8px",
              }}
            />
            <span>{colorInput.colorName}</span>
          </div>
        ) : (
          "Select a color"
        )}
      </div>
      {isOpen && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            border: "1px solid #ccc",
            borderRadius: "4px",
            backgroundColor: "#fff",
            zIndex: 1000,
            maxHeight: "200px",
            overflowY: "auto",
          }}>
          {colors.map((color, index) => (
            <div
              key={index}
              style={{
                padding: "8px",
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={() => handleSelect(color)}>
              <div
                style={{
                  backgroundColor: color.code,
                  width: "16px",
                  height: "16px",
                  borderRadius: "50%",
                  marginRight: "8px",
                }}
              />
              <span>{color.colorName}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ColorOptions;
