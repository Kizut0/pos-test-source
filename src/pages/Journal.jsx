import { useEffect, useMemo, useState } from "react";
import { productItems } from "../data/productItems";
import SalesForm from "../components/SalesForm";
import SalesTable from "../components/SalesTable";
import AddProductForm from "../components/AddProductForm";
import {
    loadSales,
    saveSales,
    loadProducts,
    saveProducts,
    loadSaleCategories,
    saveSaleCategories,
} from "../utils/storage";

export default function Journal() {
    const [sales, setSales] = useState(() => loadSales());
    const [products, setProducts] = useState(() => loadProducts(productItems));

    const defaultCats = useMemo(
        () => Array.from(new Set(products.map((p) => p.category))),
        [products]
    );

    const [categories, setCategories] = useState(() => {
        const saved = loadSaleCategories();
        const merged = [...defaultCats];

        for (const c of saved) {
            const cc = String(c).trim();
            if (!cc) continue;
            if (!merged.some((x) => x.toLowerCase() === cc.toLowerCase())) merged.push(cc);
        }
        return merged;
    });

    useEffect(() => saveSales(sales), [sales]);
    useEffect(() => saveProducts(products), [products]);

    useEffect(() => {
        const merged = [...defaultCats];
        for (const c of categories) {
            const cc = String(c).trim();
            if (!cc) continue;
            if (!merged.some((x) => x.toLowerCase() === cc.toLowerCase())) merged.push(cc);
        }
        setCategories(merged);
        saveSaleCategories(merged);

    }, [defaultCats]);

    function addSale(newSale) {
        setSales((prev) => [newSale, ...prev]);
    }

    function deleteSale(id) {
        setSales((prev) => prev.filter((s) => s.id !== id));
    }

    function addProduct(p) {

        const existsExact = products.some(
            (x) =>
                x.itemName.toLowerCase() === p.itemName.toLowerCase() &&
                x.category.toLowerCase() === p.category.toLowerCase()
        );

        if (existsExact) {
            alert("This product already exists.");
            return;
        }

        const existsNameDifferentCat = products.some(
            (x) =>
                x.itemName.toLowerCase() === p.itemName.toLowerCase() &&
                x.category.toLowerCase() !== p.category.toLowerCase()
        );

        if (existsNameDifferentCat) {
            alert("This product name already exists under a different category.");
            return;
        }


        setProducts((prev) => [...prev, p]);

        setCategories((prev) => {
            if (prev.some((c) => c.toLowerCase() === p.category.toLowerCase())) return prev;
            return [...prev, p.category];
        });
    }

    return (
        <div className="stack">
            <div className="pageHead">
                <div>
                    <h1>Sales Journal</h1>
                </div>
            </div>

            <AddProductForm
                products={products}
                categories={categories}
                onAddProduct={addProduct}
            />

            <SalesForm products={products} onAddSale={addSale} />

            <SalesTable sales={sales} onDelete={deleteSale} />
        </div>
    );
}