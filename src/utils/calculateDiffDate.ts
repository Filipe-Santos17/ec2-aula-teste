export default function calculateDiffDate(startDate: Date, endDate: Date){
    if(!(startDate instanceof Date) || !(endDate instanceof Date)) return

    const diferencaInTime = Math.abs(+startDate - +endDate)
    const timeInOneMinute = 1000 * 60
    const diferencaInMinutes = diferencaInTime / timeInOneMinute

    return diferencaInMinutes
}