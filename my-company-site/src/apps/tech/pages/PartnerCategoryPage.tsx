/*// pages/PartnerCategoryPage.tsx

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
//import PartnerLayout from "../components/Layouts/PartnersLayout";

export default function PartnerCategoryPage() {
  const { category } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`/data/partners/${category}.json`)
      .then((res) => res.json())
      .then(setData);
  }, [category]);

  if (!data) return <p className="text-center mt-10">Loading...</p>;

  return <PartnerLayout title={category || "Partners"} data={data} />;
}
*/