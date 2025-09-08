import { useSelector } from "react-redux";

// Define the roles object to use for checking roles
const ROLES = {
  employee: "employee",
  qm: "qm",
  admin: "admin",
  pending: "pending",
  salesTeam: "sales-team",
};

const cardData = [
  {
    link: "/dashboard/sap",
    image: "/images/icons/sap-logo.svg",
    title: "F6",
    description: "Query the SAP database. Gain insight into various metrics.",
    actionText: "Query SAP",
  },
  {
    link: "/dashboard/settings",
    image: "/images/icons/account-settings.svg",
    title: "Account Settings",
    description: "Update all account related information here.",
    actionText: "Manage account",
  },
];

export default function EmployeeDashboardContent() {
  const { user } = useSelector((state) => state.auth); // Get user object from Redux state

  const userRoles = user?.roles || []; // Safely get the roles array or an empty array

  return (
    <section className="py-0  overflow-hidden">
      <div className="container px-0 mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cardData.map((card, index) => {
            // Check if the user has the required role for this card
            if (card.requiredRole && !userRoles.includes(card.requiredRole)) {
              return null; // Do not render this card if the user does not have the required role
            }
            return (
              <div
                key={index}
                className="p-8 shadow-lg border rounded-lg flex flex-col"
              >
                <a href={card.link}>
                  <div className="text-center flex-grow">
                    <img
                      className="mx-auto mb-9 w-28 h-28"
                      src={card.image}
                      alt=""
                    />
                    <div>
                      <h3 className="mb-4 text-xl font-semibold tracking-tight">
                        {card.title}
                      </h3>
                      <p className="mb-8 tracking-tight">{card.description}</p>
                    </div>
                  </div>
                  <div className="mt-auto">
                    <span className="font-semibold text-indigo-500 hover:text-indigo-600 tracking-tight transition duration-200">
                      {card.actionText}
                    </span>
                  </div>
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
