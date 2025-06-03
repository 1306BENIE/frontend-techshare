import { useState, useEffect } from "react";
import type { Tool } from "@/interfaces/tools/tool";
import ToolsHeader from "@/components/features/tools/ToolsHeader";
import ToolsFilter from "@/components/features/tools/ToolsFilter";
import ToolsGrid from "@/components/features/tools/ToolsGrid";
import PageContainer from "@/components/layout/PageContainer";

const allTools: Tool[] = [
  {
    id: 1,
    name: "MacBook Pro M1",
    description: "Puissant ordinateur portable pour les professionnels.",
    price: "15,000 FCFA",
    priceValue: 15000,
    location: "Abidjan",
    status: "available",
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80",
    isNew: true,
    category: "Ordinateur",
    rating: 4.8,
    reviewsCount: 32,
    owner: {
      name: "Jean Dupont",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    rentalCount: 12,
    isInsured: true,
  },
  {
    id: 2,
    name: "iPad Pro",
    description: "Tablette polyvalente pour la créativité.",
    price: "10,000 FCFA",
    priceValue: 10000,
    location: "Abidjan",
    status: "available",
    image:
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=400&q=80",
    isNew: true,
    category: "Tablette",
    rating: 4.6,
    reviewsCount: 18,
    owner: {
      name: "Fatou Bamba",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    rentalCount: 7,
    isInsured: true,
  },
  {
    id: 3,
    name: "DJI Mavic Air 2",
    description: "Drone compact pour la photographie aérienne.",
    price: "25,000 FCFA",
    priceValue: 25000,
    location: "Abidjan",
    status: "available",
    image:
      "https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?auto=format&fit=crop&w=400&q=80",
    category: "Drone",
    rating: 4.9,
    reviewsCount: 41,
    owner: {
      name: "Ali Koné",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    },
    rentalCount: 21,
    isInsured: false,
  },
  {
    id: 4,
    name: "Sony Alpha A6400",
    description: "Appareil photo hybride pour la photo et la vidéo 4K.",
    price: "20,000 FCFA",
    priceValue: 20000,
    location: "Abidjan",
    status: "available",
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=400&q=80",
    category: "Appareil photo",
    rating: 4.7,
    reviewsCount: 25,
    owner: {
      name: "Marie Koffi",
      avatar: "https://randomuser.me/api/portraits/women/46.jpg",
    },
    rentalCount: 15,
    isInsured: true,
  },
];

export default function ToolsList() {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(30000);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const filteredTools: Tool[] = allTools.filter((tool) => {
    const matchesSearch = tool.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesLocation = location
      ? tool.location.toLowerCase().includes(location.toLowerCase())
      : true;
    const matchesPrice =
      tool.priceValue! >= minPrice && tool.priceValue! <= maxPrice;
    const matchesStatus = status ? tool.status === status : true;
    return matchesSearch && matchesLocation && matchesPrice && matchesStatus;
  });

  const resetFilters = () => {
    setSearch("");
    setLocation("");
    setMinPrice(0);
    setMaxPrice(30000);
    setStatus("");
  };

  return (
    <PageContainer>
      <ToolsHeader />
      <ToolsFilter
        search={search}
        setSearch={setSearch}
        location={location}
        setLocation={setLocation}
        minPrice={minPrice}
        setMinPrice={setMinPrice}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
        status={status}
        setStatus={setStatus}
        resetFilters={resetFilters}
        resultsCount={filteredTools.length}
      />
      <ToolsGrid loading={loading} tools={filteredTools} />
    </PageContainer>
  );
}
