import { NavLink } from "react-router";

const CallToActionSection = () => (
  <section className="py-16 sm:py-24 bg-white dark:bg-slate-900 transition-colors duration-300 section-glow">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
    <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
  Build Skills That Employers Value
</h2>
<p className="mt-6 text-lg text-slate-600 dark:text-gray-300">
  Level up your technical expertise with hands-on challenges. Prepare for placements, coding interviews, and real-world problem-solving.
</p>

      <div className="mt-10">
        <NavLink
          to={"/problems"}
          className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md shadow-lg text-white bg-blue-500 hover:bg-blue-600 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-white dark:focus:ring-offset-slate-900"
        >
          Get Started for Free
        </NavLink>
      </div>
    </div>
  </section>
);

export default CallToActionSection;
