// src/pages/PartnersDevelopers.tsx
import menuData from "../constants/menuData";
import MenuColumn from "../components/MenuColumn";

const PartnersDevelopers = () => {
  const partnersMenu = menuData.find((item) => item.name === "Partners & Developers");

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Partners & Developers</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {partnersMenu?.columns.map((col, index) => (
          <MenuColumn key={index} {...col} />
        ))}
      </div>
    </div>
  );
};

export default PartnersDevelopers;
