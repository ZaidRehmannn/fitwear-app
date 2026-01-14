import { createContext, ReactNode, useContext, useState } from "react";

interface CategoryContextType {
    selectedCategory: string;
    setSelectedCategory: (category: string) => void;
}

const CategoryContext = createContext<CategoryContextType | null>(null);

export const CategoryProvider = ({ children }: { children: ReactNode }) => {
    const [selectedCategory, setSelectedCategory] = useState("All");

    return (
        <CategoryContext.Provider value={{ selectedCategory, setSelectedCategory }}>
            {children}
        </CategoryContext.Provider>
    );
};

export const useCategory = () => {
    const context = useContext(CategoryContext);
    if (!context) throw new Error("useCategory must be used inside CategoryProvider");
    return context;
};
