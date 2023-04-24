//const data = ["nikhil","theiva","dilip","avi"]
const pg = require('pg');

// Set your PostgreSQL database connection details
const pool = new pg.Pool({
    user: 'master',
    host: 'localhost',
    database: 'fts-app-v2',
    password: 'DHNNOQIYWMDZZPOQ',
    port: '9000',
});
const speed = 10;
const Ign = 1;
const uid = 9470668481;
let temp = 0;
// Define your array of data
//const dataArray = ['Data1', 'Data2', 'Data3', 'Data4'];
const dataArray = [
    [77.6225928554361, 12.917325450020343],
    [77.6220313284565, 12.91869373821396],
    [80.2707, 13.0827],
    [77.62076789275295, 12.920198846571594],
    [77.61978522053823, 12.921703945858326],
    [77.61922369355864, 12.922798557823484],
    [77.61838140309027, 12.92457729203386],
    [77.61767949436626, 12.92608236493048],
    [77.61627567691824, 12.927450605143065],
    [77.6151526229591, 12.929366128842119],
    [77.61445071423327, 12.930734351054],
    [77.6136084237649, 12.932239386824165],
    [77.61248536980577, 12.934018053756901],
    [77.61150269759287, 12.9356598889009],
    [77.61052002537821, 12.93757534957885],
    [77.6098181166542, 12.939490795545652],
    [77.60883544443953, 12.941269410770346],
    [77.60799315397111, 12.943048013307745],
    [77.60729124524704, 12.944963417234888],
    [77.6067297182675, 12.947015619395174],
    [77.60616819128802, 12.948657368956177],
    [77.6057470460529, 12.950162296552534],
    [77.60546628256395, 12.951940835629372],
    [80.2707, 13.0827],
    [77.60560666430843, 12.954540216055804],
    [77.60588742779731, 12.956318723875611],
    [77.60630857303244, 12.958918058611545],
    [77.60687010001197, 12.961790975959573],
    [77.6067297182675, 12.964253450154004],
    [77.60616819128802, 12.967536711180443],
    [77.60560666430843, 12.969451926773417],
    [77.60434322860482, 12.97136712762233],
    [77.60350093813457, 12.972735119199754],
    [77.60265864766615, 12.974923890074322],
    [77.60223750243097, 12.976428658875093],
    [77.60055292149235, 12.976702252224214],
    [77.59957024927951, 12.976839048785408]
]

// Initialize the current index
let currentIndex = 0;

// Function to loop through data and store in database
async function loopAndStoreData() {
    // Check if there is data in the array
    if (currentIndex < dataArray.length) {
        if (currentIndex == 15) {
            temp = 1;
        }
        else {
            temp = 0;
        }
        // Get the current data
        let data = dataArray[currentIndex];
        console.log(data[1])
        console.log(data[0])
        // Store data into the database
        try {
            const client = await pool.connect();
            const query = `INSERT INTO device_data("lat","lng","time","spd","ign","uid","tempar_status") VALUES ('${data[1]}','${data[0]}',now(),'${speed}','${Ign}',${uid},'${temp}')`;
            const res = await client.query(query);
            console.log(res.rowCount, " Data inserted")
            client.release();
        } catch (err) {
            console.error(`Failed to insert data into database: ${err}`);
        }

        // Print data
        console.log(`Data: ${data}`);

        // Increment the current index
        currentIndex++;
    } else {
        console.log('No more data to loop');
    }
}

// Set up a timer to call the function every 5 seconds
setInterval(loopAndStoreData, 10000);

