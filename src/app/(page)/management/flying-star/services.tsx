const currentDate = new Date().toISOString().split("T")[0];

export function getTotalDifYear(date:any){
    const currentYear = new Date().getFullYear();
    let selectedYear = new Date(date).getFullYear();

    let arrDate = date.split("-");

    const month = Number(arrDate[1]);
    const day = Number(arrDate[2]);

    if (
        (month === 1) ||
        (month === 2 && day <= 3)
    ) {
        selectedYear -= 1;
    }


    return currentYear - selectedYear;
}

export function getTotalDifMonth(date: any) {
    const currentDate = new Date();
    const selectedDate = new Date(date);

    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    const selectedYear = selectedDate.getFullYear();
    const selectedMonth = selectedDate.getMonth();

    return (
        (currentYear - selectedYear) * 12 +
        (currentMonth - selectedMonth)
    );
}

export function getTotalDifDay(date: any){
    const currentDate = new Date();
    const selectedDate = new Date(date);

    currentDate.setHours(0, 0, 0, 0);
    selectedDate.setHours(0, 0, 0, 0);

    const difference = currentDate.getTime() - selectedDate.getTime();

    return Math.floor(difference / (1000 * 60 * 60 * 24));
}

export function getValue(count: number, defaultvalue: number, selectedDate: string) {
    let originDate = 2026;
    let selectedYear = new Date(selectedDate).getFullYear();
   
    let num = Math.abs(count);
    let value = defaultvalue;

    for (let i = 1; i <= num; i++) {
        if (selectedYear > originDate) {
            value--;

            if (value === 0) {
                value = 9;
            }
        } else {
            value++;

            if (value === 10) {
                value = 1;
            }
        }
    }

    return value;
}


export function getValueDay(
    count: number,
    defaultvalue: number,
    selectedDate: string
) {
    const originDate = new Date("2026-09-01T00:00:00");
    const selected = new Date(`${selectedDate}T00:00:00`);

    const difference = Math.round(
        (selected.getTime() - originDate.getTime()) /
        (1000 * 60 * 60 * 24)
    );

    let value = defaultvalue;

    for (let i = 0; i < Math.abs(difference); i++) {
        if (difference > 0) {
            value++;

            if (value > 9) {
                value = 1;
            }
        } else if (difference < 0) {
            value--;

            if (value < 1) {
                value = 9;
            }
        }
    }

    return value;
}


export function getValueMonth(selectedDate: string) {
    const [year, month, day] = selectedDate.split("-").map(Number);

    const fengShuiYear =
        month < 2 || (month === 2 && day < 4)
            ? year - 1
            : year;

    const zodiacIndex = fengShuiYear % 12;

    let defaultValue = 2;

    if ([4, 10, 7, 1].includes(zodiacIndex)) {
        defaultValue = 8;
    } else if ([8, 2, 5, 11].includes(zodiacIndex)) {
        defaultValue = 5;
    }

    // Actual solar month mapping
    const cutoffs = [
        { month: 1, day: 5, solarMonth: 12 },
        { month: 2, day: 4, solarMonth: 1 },
        { month: 3, day: 5, solarMonth: 2 },
        { month: 4, day: 5, solarMonth: 3 },
        { month: 5, day: 5, solarMonth: 4 },
        { month: 6, day: 5, solarMonth: 5 },
        { month: 7, day: 7, solarMonth: 6 },
        { month: 8, day: 7, solarMonth: 7 },
        { month: 9, day: 7, solarMonth: 8 },
        { month: 10, day: 8, solarMonth: 9 },
        { month: 11, day: 7, solarMonth: 10 },
        { month: 12, day: 7, solarMonth: 11 }
    ];

    let solarMonth = 11;

    for (const cutoff of cutoffs) {
        if (
            month > cutoff.month ||
            (month === cutoff.month && day >= cutoff.day)
        ) {
            solarMonth = cutoff.solarMonth;
        }
    }

    let center = defaultValue - (solarMonth - 1);

    while (center <= 0) {
        center += 9;
    }

    // Southeast Palace
    return center === 1 ? 9 : center - 1;
}





type Palace =
    | "SE" | "S" | "SW"
    | "E" | "C" | "W"
    | "NE" | "N" | "NW";

export function getMonthlyStar(
    selectedDate: string,
    palace: Palace
) {
    if (!selectedDate) return 0;

    // Existing function mo: returns Southeast star
    const seStar = getValueMonth(selectedDate);

    // Kunin ang Center star mula sa SE star
    const centerStar = (seStar % 9) + 1;

    const flyingOrder: Palace[] = [
        "C", "NW", "W", "NE", "S",
        "N", "SW", "E", "SE"
    ];

    const offset = flyingOrder.indexOf(palace);

    return ((centerStar - 1 + offset) % 9) + 1;
}