
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const handleExcelDownload = (data) => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'blob' });
    saveAs(excelBuffer, 'data.xlsx');
};

export default handleExcelDownload;
