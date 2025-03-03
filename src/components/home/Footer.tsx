
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="w-full bg-black text-gray-100 py-16 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2">
          <h3 className="text-xl font-bold mb-4">Ready to find the next football star?</h3>
          <p className="text-gray-300 mb-4">Sign up for our newsletter to get the latest updates and insights.</p>
          <div className="flex">
            <input
              type="email"
              placeholder="Your email"
              className="bg-gray-800 text-white px-4 py-2 rounded-l focus:outline-none flex-grow"
            />
            <button className="bg-white text-black px-4 py-2 rounded-r hover:bg-gray-200 transition-colors">
              Subscribe
            </button>
          </div>
          <div className="mt-6">
            <Link to="/auth" className="text-white bg-gradient-to-r from-purple-600 to-pink-500 px-4 py-2 rounded-lg hover:opacity-90 transition-all">
              Try ScoutSmart Now
            </Link>
          </div>
        </div>
        
        <div>
          <h4 className="text-lg font-medium mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Home</a></li>
            <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Features</a></li>
            <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Pricing</a></li>
            <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Blog</a></li>
            <li><Link to="/auth" className="text-gray-300 hover:text-white transition-colors">Login</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-lg font-medium mb-4">Company</h4>
          <ul className="space-y-2">
            <li><a href="#" className="text-gray-300 hover:text-white transition-colors">About Us</a></li>
            <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Careers</a></li>
            <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Contact</a></li>
            <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Partners</a></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row md:justify-between items-center">
        <div className="text-gray-400 mb-4 md:mb-0">
          &copy; {new Date().getFullYear()} ScoutSmart. All rights reserved.
        </div>
        <div className="flex space-x-6">
          <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</a>
        </div>
      </div>
    </footer>
  );
}
