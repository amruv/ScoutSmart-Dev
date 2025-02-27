
export function Footer() {
  return (
    <footer className="bg-black text-[#eee] py-20 w-full">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Newsletter Signup */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">Sign up to ScoutSmart News</h3>
            <p className="mb-6 text-gray-400">
              Get monthly insights on football analytics, scouting trends, and industry updates.
            </p>
            <div className="space-y-4">
              <input 
                type="email" 
                placeholder="Email Address" 
                className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
              />
              <label className="flex items-start space-x-2 text-sm text-gray-400">
                <input type="checkbox" className="mt-1" />
                <span>
                  By ticking this box, you agree to receive updates from ScoutSmart. 
                  You can update your preferences anytime via your account settings.
                </span>
              </label>
              <button 
                className="px-6 py-2 rounded bg-gradient-to-r from-purple-600 to-pink-500 text-white font-medium hover:from-purple-700 hover:to-pink-600 transition-colors"
              >
                Sign me up!
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Our Technology</a></li>
              <li><a href="#" className="hover:text-white transition-colors">News & Updates</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Partnership Program</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Press Coverage</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Leadership</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Terms of Use
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Cookie Notice
              </a>
            </div>
            <div className="text-gray-400">
              © {new Date().getFullYear()} ScoutSmart. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
