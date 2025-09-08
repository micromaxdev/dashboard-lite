const fs = require("fs");
const seedNewCustomers = require("../seed/seedNewCustomers");

let debounceTimer;

module.exports = function initialiseFileWatcher(
  csvDir,
  databaseConnected,
  updateCsvs
) {
  try {
    fs.watch(csvDir, (eventType, filename) => {
      if (filename && databaseConnected) {
        console.log(`File ${filename} was modified. Scheduling updateCsvs.`);

        if (debounceTimer) {
          clearTimeout(debounceTimer);
        }

        debounceTimer = setTimeout(async () => {
          console.log(`Calling updateCsvs after 30 seconds delay.`);
          try {
            // Call updateCsvs and wait for it to complete
            await updateCsvs();
            console.log("updateCsvs completed successfully.");

            // Now seed the new customers
            console.log("Starting seedNewCustomers after CSV update...");
            await seedNewCustomers();
            console.log(
              "seedNewCustomers completed successfully after CSV update."
            );
          } catch (updateError) {
            console.error("Error in file watcher operations:", updateError);
          }
        }, 30000);
      }
    });
  } catch (watchError) {
    console.error("Error watching the CSV directory:", watchError);
  }
};
