import { useState } from "react";

export default function AddProductForm({ products, categories, onAddProduct }) {
    const [name, setName] = useState("");
    const [categoryMode, setCategoryMode] = useState("select"); // "select" | "new"
    const [selectedCategory, setSelectedCategory] = useState(categories[0] || "");
    const [newCategory, setNewCategory] = useState("");
    const [price, setPrice] = useState("");

    const isDuplicateCategory = (cat) =>
        categories.some((c) => c.toLowerCase() === cat.toLowerCase());

    function submit(e) {
        e.preventDefault();

        const productName = name.trim();
        const cat =
            categoryMode === "new" ? newCategory.trim() : selectedCategory.trim();
        const unitPrice = Number(price);

        if (!productName) {
            alert("Please enter product name.");
            return;
        }

        if (!cat) {
            alert("Please select or enter a category.");
            return;
        }

        if (!Number.isFinite(unitPrice) || unitPrice <= 0) {
            alert("Unit price must be greater than 0.");
            return;
        }

        // ✅ Only rule: existing category cannot be duplicated (warn & block)
        if (categoryMode === "new" && isDuplicateCategory(cat)) {
            alert("This category already exists.");
            return;
        }

        // (Optional) Block duplicate product name (simple check)
        const existsProduct = products?.some(
            (p) => p.itemName.toLowerCase() === productName.toLowerCase()
        );
        if (existsProduct) {
            alert("This product name already exists.");
            return;
        }

        onAddProduct({
            itemName: productName,
            category: cat,
            unitPrice,
            inventory: 0,
        });

        // reset
        setName("");
        setPrice("");
        setNewCategory("");
        setCategoryMode("select");
        setSelectedCategory(categories[0] || "");
    }

    return (
        <div className="card">
            <div className="cardTitle">Add New Product</div>

            <form className="gridForm" onSubmit={submit}>
                <label className="field">
                    <span>Product Name</span>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="New product"
                    />
                </label>

                <label className="field">
                    <span>Category Mode</span>
                    <select
                        value={categoryMode}
                        onChange={(e) => setCategoryMode(e.target.value)}
                    >
                        <option value="select">Select existing</option>
                        <option value="new">Create new</option>
                    </select>
                </label>

                {categoryMode === "select" ? (
                    <label className="field">
                        <span>Category</span>
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            {categories.map((c) => (
                                <option key={c} value={c}>
                                    {c}
                                </option>
                            ))}
                        </select>
                    </label>
                ) : (
                    <label className="field">
                        <span>New Category</span>
                        <input
                            value={newCategory}
                            onChange={(e) => setNewCategory(e.target.value)}
                            placeholder="e.g. drinks"
                        />
                    </label>
                )}

                <label className="field">
                    <span>Unit Price</span>
                    <input
                        type="number"
                        min="1"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="e.g. 50"
                    />
                </label>


                <button className="btn primary" type="submit">
                    Add Product
                </button>
            </form>
        </div>
    );
}