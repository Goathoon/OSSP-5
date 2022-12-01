const https = require("https")
const parser = require("node-html-parser")
const url = "https://game.naver.com/esports/general/schedule/vct?date=2022-09"

const header = {
    headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36"
    }
}

https.get(
    url, header, (res) => {
        let data = "";
        res.on("data", (chunk) => {
            data += chunk;
        });
        res.on("end", () => {
            const root = parser.parse(data)
            const list = root.querySelectorAll("#__NEXT_DATA__")
            list.forEach((item) => {
                schedule_json = item.innerText.trim()
            })

            schedule_json = JSON.parse(schedule_json)
            console.log(schedule_json.props.initialState.schedule.monthSchedule[0].schedules)
        })
    }
)