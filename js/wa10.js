const customName = document.getElementById('customname');
const randomize = document.querySelector('.randomize');
const story = document.querySelector('.story');

function randomValueFromArray(array) {
    const random = Math.floor(Math.random()*array.length);
    return array[random];
}

const storyText = "Within the deep enchanted forest, :insertName: escaped the :insertX: and stumbled upon the golden meadow. The meadow was a hot 94 degrees fahrenheit. Inside the pocket of :insertName:'s satchel, there was a :insertY: that was more than meets the eye. It weighed a whopping 1000 pounds, but :insertName: could carry it just fine. Fiddling with the :insertY: in hand and moving swiftly, :insertName: saw a :insertZ: in the near horizon. When :insertName: reached the :insertZ:, :insertName: began to realize it was an uncanny representation of their home and woke from a blissful dream, realizing none of it was real at all.";
const starterName = ["Bob", "Joe", "Sue", "Jane"];
const insertX = ["dark crows", "swift fae", "scary trolls", "evil witch"];
const insertY = ["stone", "flower", "beetle", "golden egg"];
const insertZ = ["cabin", "house", "mansion", "dorm"];

randomize.addEventListener('click', result);

function result() {
    let newStory = storyText;

    let name = randomValueFromArray(starterName);
    let xItem = randomValueFromArray(insertX);
    let yItem = randomValueFromArray(insertY);
    let zItem = randomValueFromArray(insertZ);

    newStory = newStory.replace(/:insertX:/g, xItem);
    newStory = newStory.replace(/:insertY:/g, yItem);
    newStory = newStory.replace(/:insertZ:/g, zItem);

    if(customName.value !== '') {
        name = customName.value;
        name = name.charAt(0).toUpperCase() + name.slice(1);
    }
    
    newStory = newStory.replace(/:insertName:/g, name);

    if (document.getElementById("uk").checked) {
        const weight = Math.round(1000/14) + ' stones';
        const temperature =  Math.round((94 - 32) * (5/9)) + ' centigrade';
        
        newStory = newStory.replaceAll("94 degrees fahrenheit", temperature);
        newStory = newStory.replaceAll("1000 pounds", weight);
    }

    story.textContent = newStory;
    story.style.visibility = 'visible';
}