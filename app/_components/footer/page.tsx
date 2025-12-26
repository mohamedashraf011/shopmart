import Link from "next/link";
import {
MapPin,
Phone,
Mail
} from "lucide-react";

export default function Footer() {
return (
<footer className="bg-white border-t border-gray-200">
    <div className="max-w-7xl mx-auto px-6 py-16">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">

        {/* Brand & Info */}
        <div className="lg:col-span-1">
        <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 flex items-center justify-center font-bold">
                <i className="fa-solid fa-bag-shopping text-2xl"></i>
            </div>
            <span className="text-2xl font-bold">ShopMart</span>
        </div>

        <p className="text-gray-600 text-sm leading-relaxed mb-6">
            Your one-stop destination for the latest technology, fashion,
            and lifestyle products. Quality guaranteed with fast shipping
            and excellent customer service.
        </p>

        <ul className="space-y-3 text-sm text-gray-600">
            <li className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            123 Shop Street, October City, DC 12345
            </li>
            <li className="flex items-center gap-2">
            <Phone className="w-4 h-4" />
            (+20) 01093333333
            </li>
            <li className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            support@shopmart.com
            </li>
        </ul>
        </div>

        {/* SHOP */}
        <div>
        <h4 className="font-semibold mb-4">SHOP</h4>
        <ul className="space-y-3 text-sm text-gray-600">
            <li><Link href="#" className="footer-link">Electronics</Link></li>
            <li><Link href="#" className="footer-link">Fashion</Link></li>
            <li><Link href="#" className="footer-link">Home & Garden</Link></li>
            <li><Link href="#" className="footer-link">Sports</Link></li>
            <li><Link href="#" className="footer-link">Deals</Link></li>
        </ul>
        </div>

        {/* CUSTOMER SERVICE */}
        <div>
        <h4 className="font-semibold mb-4">CUSTOMER SERVICE</h4>
        <ul className="space-y-3 text-sm text-gray-600">
            <li><Link href="#" className="footer-link">Contact Us</Link></li>
            <li><Link href="#" className="footer-link">Help Center</Link></li>
            <li><Link href="#" className="footer-link">Track Your Order</Link></li>
            <li><Link href="#" className="footer-link">Returns & Exchanges</Link></li>
            <li><Link href="#" className="footer-link">Size Guide</Link></li>
        </ul>
        </div>

        {/* ABOUT */}
        <div>
        <h4 className="font-semibold mb-4">ABOUT</h4>
        <ul className="space-y-3 text-sm text-gray-600">
            <li><Link href="#" className="footer-link">About shopmart</Link></li>
            <li><Link href="#" className="footer-link">Careers</Link></li>
            <li><Link href="#" className="footer-link">Press</Link></li>
            <li><Link href="#" className="footer-link">Investor Relations</Link></li>
            <li><Link href="#" className="footer-link">Sustainability</Link></li>
        </ul>
        </div>

        {/* POLICIES */}
        <div>
        <h4 className="font-semibold mb-4">POLICIES</h4>
        <ul className="space-y-3 text-sm text-gray-600">
            <li><Link href="#" className="footer-link">Privacy Policy</Link></li>
            <li><Link href="#" className="footer-link">Terms of Service</Link></li>
            <li><Link href="#" className="footer-link">Cookie Policy</Link></li>
            <li><Link href="#" className="footer-link">Shipping Policy</Link></li>
            <li><Link href="#" className="footer-link">Refund Policy</Link></li>
        </ul>
        </div>

    </div>
    </div>
</footer>
);
}
