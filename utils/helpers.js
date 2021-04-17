/**
 * Simple helper function to parse through heavily embeded JSON and return what we actually want for the app
 * 
 * @param {Object} JSON
 * @return {Array} Array of bounding box object
 */

 export const parseClarifaiData = (rawData) => {
    const boundingBoxes = [];
    let regions = rawData.outputs[0].data.regions;
    for(const res of regions) {
        boundingBoxes.push(res.region_info.bounding_box)
    }
    return boundingBoxes;
}
