import { FaChevronRight } from "react-icons/fa";

interface BreadCrumbProps {
    items: { label: string; href?: string }[];
}

const BreadCrumb = ({ items }: BreadCrumbProps) => {
    return (
        <nav className="flex items-center text-sm text-gray-600 cursor-pointer">
            {items.map((item, index) => (
                <div key={index} className="flex items-center group">
                    {item.href ? (
                        <a href={item.href} className="flex items-center group-hover:text-[var(--color-primary)]">
                            {item.label}
                        </a>
                    ) : (
                        <span className="flex items-center text-gray-800 font-medium group-hover:text-[var(--color-primary)]">
                            {item.label}
                        </span>
                    )}

                    {index < items.length - 1 && (
                        <FaChevronRight className="mx-2 text-gray-400 text-xs group-hover:text-[var(--color-primary)]" />
                    )}
                </div>
            ))}
        </nav>
    );
};

export default BreadCrumb;
