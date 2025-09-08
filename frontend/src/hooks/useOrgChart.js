/**
 * Generates an organizational chart based on user data.
 * @returns {Object} The generated organizational chart data.
 */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../features/auth/authSlice";

const useOrgChart = () => {
  //--------------------------GET USERS--------------------------//

  const dispatch = useDispatch();
  useEffect(() => {
    // Dispatch the action to get users
    dispatch(getUser());
  }, [dispatch]);

  // Access users from the Redux store
  const users = useSelector((state) => state.auth.users);

  const generateOrgChart = () => {
    //--------------------------FUNCTIONS--------------------------//
    const levelfourfillup = (objectWithEmployees) => {
      // Iterate through the array and log each supRole
      objectWithEmployees.forEach((supervisor) => {
        const supRole = supervisor.supRole.role;

        // Create an object for each supervisor role
        const supervisorObject = {
          name: supRole,
          children: [],
        };

        // Fill the children array with employee information
        supervisor.employees.forEach((employee) => {
          const childObject = {
            name: employee.role, // Changing 'role' to 'name'
            attributes: employee.names, // Changing 'names' to 'attributes'
            children: [],
          };
          supervisorObject.children.push(childObject);
        });
        // Use findNodeByName to find the node with supervisorObject.name and insert supervisorObject.children
        const parentNode = findNodeByName(
          modifiedOrgChartData,
          supervisorObject.name,
          supervisorObject.children
        );
        if (parentNode) {
          // console.log("Supervisor Object:", parentNode);
        } else {
          console.log(`Node with name '${supervisorObject.name}' not found.`);
        }
      });
    };

    function findUsersByManagementLevel(users, targetManagementLevel) {
      const matchedUsers = [];
      const uniqueRoles = new Set();

      users.forEach((user) => {
        // Assuming 'managementLevel' is a property in 'companyRoles'
        const matchingRoles = user.companyRoles.filter(
          (role) => role.managementLevel === targetManagementLevel
        );

        if (matchingRoles.length > 0) {
          const roleName = matchingRoles[0].role;

          // Check if the role is already added to the result
          if (!uniqueRoles.has(roleName)) {
            uniqueRoles.add(roleName);

            // Extract relevant information and store it in an object
            const userInformation = {
              name: roleName, // There can only be one name, take the first one
              attributes: users
                .filter((u) =>
                  u.companyRoles.some((role) => role.role === roleName)
                )
                .map((u) => `${u.firstName} ${u.lastName}`),
            };
            // Add the object to the array
            matchedUsers.push(userInformation);
          }
        }
      });

      return matchedUsers;
    }

    function insertChildrenData(orgChartData, input) {
      // Recursive function to find the most deeply nested empty 'children' field
      const findDeepestEmptyChildren = (node) => {
        if (node.children.length === 0) {
          return node;
        } else {
          // Recursively check each child
          for (const child of node.children) {
            const result = findDeepestEmptyChildren(child);
            if (result) {
              return result;
            }
          }
        }
      };

      // Find the most deeply nested empty 'children' field
      const targetNode = findDeepestEmptyChildren(orgChartData);

      // If no empty 'children' field is found, insert at the top level
      if (!targetNode) {
        orgChartData.children = input.map((item) => ({
          name: item.name,
          attributes: item.attributes,
          children: [],
        }));
      } else {
        // Insert each object from 'input' into the found empty 'children' field
        targetNode.children = input.map((item) => ({
          name: item.name,
          attributes: item.attributes,
          children: [],
        }));
      }

      return orgChartData;
    }

    function findNodeByName(node, targetName, targetData) {
      // Check if the current node matches the target name and has an empty children array
      if (node.name === targetName && Array.isArray(node.children)) {
        if (node.children.length === 0) {
          // Copy targetData into the children array of the matching node
          node.children = targetData;
          return node;
        } else {
          node.children.push(...targetData);
          return node;
        }
      }

      // Recursively search through the children arrays
      if (Array.isArray(node.children)) {
        for (const childNode of node.children) {
          const foundNode = findNodeByName(childNode, targetName, targetData);

          // If a matching node is found in any of the children, return it
          if (foundNode) {
            return foundNode;
          }
        }
      }

      // Return null if no matching node is found
      return null;
    }

    function findSupervisorsWithEmployees(users, lvl) {
      const supervisorsWithEmployees = [];

      // Find level management level users
      const levelUsers = users.filter((user) => {
        return user.companyRoles.some((role) => role.managementLevel === lvl);
      });

      // Iterate over levelUsers to find supervisors and their employees
      levelUsers.forEach((level) => {
        const supRole = level.companyRoles.find(
          (role) => role.managementLevel === lvl
        );
        const employees = [];

        // Find all users who have level as their supervisor
        const supervisorEmployees = users.filter(
          (user) => user.supervisor === level._id
        );
        // Iterate through supervisor's employees
        supervisorEmployees.forEach((employee) => {
          // If level 4, only output those supervisors with companyRoles length == 1
          if ((lvl === 4 && level.companyRoles.length === 1) || lvl !== 4) {
            // Find the corresponding company role for the employee
            const companyRole = employee.companyRoles.find(
              (role) => role.managementLevel === 4
            );
            if (companyRole) {
              // Check if the role already exists in employees array
              const index = employees.findIndex(
                (emp) => emp.role === companyRole.role
              );
              if (index === -1) {
                // Role doesn't exist, add a new entry
                employees.push({
                  role: companyRole.role,
                  names: [`${employee.firstName} ${employee.lastName}`],
                });
              } else {
                // Role exists, add employee name to existing entry
                employees[index].names.push(
                  `${employee.firstName} ${employee.lastName}`
                );
              }
            }
          }
        });

        // Add supervisor with employees to the result array
        if (Array.isArray(employees) && employees.length > 0) {
          supervisorsWithEmployees.push({ supRole, employees });
        }
      });

      return supervisorsWithEmployees;
    }
    //--------------------------EXECUTION--------------------------//

    // Org chart generation
    const orgChartData = {
      name: "Directors",
      attributes: ["Antonio Fantasia", "Carlo Foligni"],
      children: [],
    };

    let modifiedOrgChartData = orgChartData;

    for (let level = 1; level <= 3; level++) {
      const usersByLevel = findUsersByManagementLevel(users, level);
      if (level === 3) {
        usersByLevel.push({
          name: "Quality Officer",
          attributes: ["Domenic Pipino"],
        });
      }
      modifiedOrgChartData = insertChildrenData(
        modifiedOrgChartData,
        usersByLevel
      );
    }

    // Call the function and store the result in a variable
    const supervisorsWithEmployees = findSupervisorsWithEmployees(users, 3);

    const othersWithEmployees = findSupervisorsWithEmployees(users, 4);
    levelfourfillup(supervisorsWithEmployees);
    levelfourfillup(othersWithEmployees);

    console.log("Final Chart:", supervisorsWithEmployees);
    return modifiedOrgChartData;
  };

  // Return any data or functions that need to be accessed outside
  return {
    generateOrgChart,
  };
};

export default useOrgChart;
