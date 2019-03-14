
import * as moment from 'moment';
import { Collection, PropertyInfo, Properties, DeviceInfo, DeviceSchedule, Devices, AccumulatedUsages, Usages, SingleUsage } from './model';

const round = function (val) {
    // return parseFloat(val.toFixed(2)).toFixed(2)
    return Math.round(val * 100) / 100
}

export const parsePropertiesJson = function (res: any) {
    let output = []

    let json = res//.json()

    if (!json.members)
        return output;

    let results = json.members
    let no = 0;

    for (let o = 0; o < results.length; o++) {

        let body = results[o];
        let usages = body.energyUsages;
        let data = null;

        if (usages) {
            data = {};

            for (let z = 0; z < usages.length; z++) {
                let usage = usages[z]

                let columns = usage.columns;
                let values = usage.values;
                let rowData = values[0];
                let row = {};

                //usages
                rowData[0] = moment.utc(rowData[0]).local().format('YYYY-MM-DD HH:mm:ss')//this.parseUnixDate(rowData[0]).local().format('YYYY-MM-DD HH:mm:ss')

                //##data line

                for (let o = 0; o < columns.length; o++) {
                    row[columns[o]] = rowData[o]
                }

                // console.log(row)

                //skip null record
                if (row['Power Usage'] != null) {
                    //## w > kw
                    row['usage'] = round(row['Power Usage'])
                    row['usageKW'] = round(row['Power Usage'] / 1000)
                } else {
                    row['usage'] = 0;
                    row['usageKW'] = 0;
                }

                data[usage.label] = row;
            }
        }

        //  console.info(data)

        // output[body.label] = data
        output.push({
            no: ++no,
            id: body['@id'],
            address: body.address,
            usages: data
        })
    }

    // console.log(util.stringify(output));

    return output;
}

const singleDeviceInfo = function (json: any): any {
    let data = [];
    let status = json.status;

    if (status) {
        let columns = status.columns;
        let values = status.values;

        //status
        for (let i = 0; i < values.length; i++) {
            let rowData = values[i];

            rowData[0] = moment.utc(rowData[0]).local().format('YYYY-MM-DD HH:mm:ss')//this.parseUnixDate(rowData[0]).local().format('YYYY-MM-DD HH:mm:ss')

            //##data line
            let row = {};
            for (let o = 0; o < columns.length; o++) {
                row[columns[o]] = rowData[o]
            }

            // console.log(row)

            //skip null record
            if (row['Current Load'] != null) {
                //## w > kw
                row['load'] = round(row['Current Load'])
                row['loadKW'] = round(row['Current Load'] / 1000)
            } else {
                row['load'] = 0;
                row['loadKW'] = 0;
            }

            //convert <1,0> status to <true,off>
            if (row['Power Status'] != null)
                row['Power Status'] = (row['Power Status'] == '1' ? true : false)

            data.push(row);
        }
    }

    //  console.info(data)

    // output[body.label] = data
    let output = new DeviceInfo({
        id: json['@id'],
        name: json.name,
        status: data && data.length > 0 ? data[0] : {},
        usages: null,
        schedules: new Collection()
    })

    return output
}

export const parseDeviceJson = function (res: any) {
    let output = {}

    let json = res//.json()

    if (!json.status)
        return output;

    output = singleDeviceInfo(json)

    return output
}

export const parseDevicesJson = function (res: any): Collection {
    let output = new Collection()

    let json = res//.json()

    if (!json.members)
        return output;

    let results = json.members

    for (let z = 0; z < results.length; z++) {
        let body = results[z];
        let data = singleDeviceInfo(body)
        // output[body.label] = data
        output.add(data)
    }

    // console.log(output);
    return output;
}

// const parseSolarJson = function(res: any): Collection {
//         let output = new Collection()

//         let json = mock.SolarJSON// res.json()

//         if (!json.members)
//             return output;

//         let results = json.members

//         for (let z = 0; z < results.length; z++) {
//             let body = results[z];
//             let data = EnergyShareService.singleDeviceInfo(body)
//             // output[body.label] = data
//             output.add(data)
//         }

//         // console.log(output);
//         return output;
//     }

export const parseAccumulatedUsageJson = function (res: any) {
    let output = {}

    let json = res//.json()

    if (!json.members)
        return output;

    let results = json.members

    for (let z = 0; z < results.length; z++) {

        let body = results[z];

        let columns = body.columns;
        let values = body.values;
        let rowData = body.values[0];
        let data = {};

        for (let o = 0; o < columns.length; o++) {
            data[columns[o]] = rowData[o]
        }

        if (rowData[1] != null) {
            //## w > kw
            data['usage'] = round(rowData[1])
            data['usageKW'] = round(rowData[1] / 1000)
        } else {
            data['usage'] = 0;
            data['usageKW'] = 0;
        }

        output[columns[1]] = data
    }

    // console.log(output);
    return output;
}

export const parseSingleUsageJson = function(res: any) {
    let output = {}

    let json = res//.json()

    if (!json.members)
        return output;

    let results = json.members

    for (let z = 0; z < results.length; z++) {

        let body = results[z];//.series[0];

        let columns = body.columns;
        let values = body.values;
        let rowData = values[0];

        //body
        rowData[0] = moment.utc(rowData[0]).local().format('YYYY-MM-DD HH:mm:ss')//this.parseUnixDate(rowData[0]).local().format('YYYY-MM-DD HH:mm:ss')

        //##data line
        let row = {};
        for (let o = 0; o < columns.length; o++) {
            row[columns[o]] = rowData[o]
        }

        //skip null record
        if (row['Power Usage'] != null) {
            //## w > kw
            row['usage'] = round(row['Power Usage'])
            row['usageKW'] = round(row['Power Usage'] / 1000)
        } else {
            row['usage'] = 0;
            row['usageKW'] = 0;
        }

        output[body.label] = row
    }

    // console.log(output);
    return output;
}

export const parseUsageJson = function(res: any) {
    let output = {}

    let json = res//.json()

    if (!json.members)
        return output;

    let results = json.members

    for (let z = 0; z < results.length; z++) {

        let body = results[z];//.series[0];

        let columns = body.columns;
        let values = body.values;
        let data = [];

        //body
        for (let i = 0; i < values.length; i++) {
            let rowData = values[i];

            rowData[0] = moment.utc(rowData[0]).local().format('YYYY-MM-DD HH:mm:ss')//this.parseUnixDate(rowData[0]).local().format('YYYY-MM-DD HH:mm:ss')

            //##data line
            let row = {};
            for (let o = 0; o < columns.length; o++) {
                row[columns[o]] = rowData[o]
            }

            //skip null record
            if (row['Power Usage'] != null) {
                //## w > kw
                row['usage'] = round(row['Power Usage'])
                row['usageKW'] = round(row['Power Usage'] / 1000)
            } else {
                row['usage'] = 0;
                row['usageKW'] = 0;
            }

            data.push(row);
        }

        output[body.label] = data
    }

    // console.log(output);
    return output;
}