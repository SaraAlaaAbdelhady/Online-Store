import { HiOutlineChip } from "react-icons/hi";
import { Link } from "react-router-dom";
import { HiOutlineTag } from "react-icons/hi";
import { useProduct } from "../contexts/ProductContext"
import { PiDressBold } from "react-icons/pi";
import { useState, useEffect } from "react";
import { MdOutlinePhoneAndroid } from "react-icons/md";
import { RiHome9Fill } from "react-icons/ri";
import { IoFootball } from "react-icons/io5";
import { IoSparklesSharp } from "react-icons/io5";

const categories = [
    {
        name: "Electronics",
        apiValue: "electronics",
        icon: "cpu",
        color: "#34d399"
    },
    {
        name: "Fashion",
        apiValue: "fashion",
        icon: "dress",
        color: "#fbbf24",
    },
    {
        name: "Phones",
        apiValue: "phones",
        icon: "phone",
        color: "#fb7185",
    },
    {
        name: "Beauty",
        apiValue: "beauty",
        icon: "sparkle",
        color: "#22d3ee",
    },
    {
        name: "Home",
        apiValue: "home",
        icon: "home",
        color: "#a78bfa",
    },
    {
        name: "Sports",
        apiValue: "sports",
        icon: "ball",
        color: "#94a3b8",
    },
]

const categoryIcons = {
    default: HiOutlineTag,
    cpu: HiOutlineChip,
    dress: PiDressBold,
    phone: MdOutlinePhoneAndroid,
    home: RiHome9Fill,
    ball: IoFootball,
    sparkle: IoSparklesSharp,
}


function ShopByCategory(){
    const { searchProducts } = useProduct();
    const [categoryCounts, setCategoryCounts] = useState({});
    const [countsLoading, setCountsLoading] = useState(true);

    useEffect(() => {
        async function fetchCounts(){
            try{
                const results = await Promise.all(
                    categories.map((cat) => searchProducts({category: cat.apiValue}))
                )
                console.log("RESULTS:", results); 
                const counts = {};
                categories.forEach((cat, i) => {
                    counts[cat.apiValue] = results[i]?.totalProducts ?? 0;
                })
                setCategoryCounts(counts)
            } catch (error) {
                console.error("Error fetching category counts:", error)
            } finally {
                setCountsLoading(false)
            }
        }
        fetchCounts();
    }, [])

    return(
        <section className="px-12  lg:px-20   py-12  " id="categories" >
            <div className="mb-10 text-center">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-200">Shop By Category</h2>
                <p className="mt-2 text-base text-slate-500 dark:text-slate-400">Browse our wide range of categories</p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 lg:grid-cols-4">
                {categories.map((category) => {
                    const Icon = categoryIcons[category.icon] ?? categoryIcons.default;
                    const count = categoryCounts[category.apiValue] ?? 0;

                    return (
                        <Link 
                            key={category.apiValue}     
                            to={`/shop?category=${category.apiValue}`}
                            style={{ "--cat": category.color }}
                            className={`group relative min-h-30 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-all duration-100 hover:border-[var(--cat)] overflow-hidden`}
                        >
                            <div className={`absolute top-0 left-0 right-0 h-[4px] rounded-t-2xl bg-[var(--cat)]`}></div>

                            <div className="flex items-start justify-between gap-1">
                                <div className="min-w-0">
                                    <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200">{category.name}</h3>
                                    <p className="mt-1 text-sm text-slate-400">{countsLoading ? "Loading..." : `${count} products`}</p>
                                </div>
                                <div className="relative mb-3 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--cat)] overflow-hidden">
                                    <div className="absolute inset-0 bg-black dark:bg-white opacity-0 transition-opacity duration-100 group-hover:opacity-15 dark:group-hover:opacity-25"></div>
                                    <Icon size={24} className="relative z-10 text-white"/>
                                </div> 
                            </div>

                            <div className="absolute bottom-5 left-5 right-5 sm:left-6 sm:right-6 h-px bg-gradient-to-t from-transparent via-slate-200 to-transparent dark:via-slate-700"></div>
                        </Link>
                    )
                })}
            </div>
        </section>
    )
}

export default ShopByCategory;
