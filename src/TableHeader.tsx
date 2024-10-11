// Function to format date in DD/MM/YYYY format
const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
};

// Get current date and yesterday's date
const getCurrentAndYesterdayDates = () => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1); // Set to yesterday

  return {
    today: formatDate(today),
    yesterday: formatDate(yesterday),
  };
};

const TableHeader = () => {
  const { today, yesterday } = getCurrentAndYesterdayDates();

  return (
    <thead>
      <tr>
        <th rowSpan={3}>S.No.</th>
        <th rowSpan={3}>Name of the Reservoir</th>
        <th rowSpan={3}>District</th>
        <th rowSpan={3}>Authorised Person</th>
        <th rowSpan={3}>Contact No.</th>
        <th rowSpan={3}>LSL in Meter</th>
        <th rowSpan={3}>FRL in Meter</th>
        <th colSpan={8}>Water Level in Meter</th>
        <th colSpan={2}>Rainfall in mm</th>
      </tr>
      <tr>
        <th colSpan={4}>Yesterday ({yesterday})</th>
        <th colSpan={4}>Today ({today})</th>
        <th rowSpan={2}>Daily</th>
        <th rowSpan={2}>Total</th>
      </tr>
      <tr>
        <th>08:00 AM</th>
        <th>12:00 PM</th>
        <th>04:00 PM</th>
        <th>08:00 PM</th>
        <th>08:00 AM</th>
        <th>12:00 PM</th>
        <th>04:00 PM</th>
        <th>08:00 PM</th>
      </tr>
    </thead>
  );
};

export default TableHeader;
