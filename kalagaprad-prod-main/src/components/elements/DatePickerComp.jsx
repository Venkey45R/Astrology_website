import * as React from 'react';
import dayjs from 'dayjs';
import {
  AdapterDayjs
} from '@mui/x-date-pickers/AdapterDayjs';
import {
  LocalizationProvider
} from '@mui/x-date-pickers/LocalizationProvider';
import {
  DatePicker
} from '@mui/x-date-pickers/DatePicker';
import {
  ThemeProvider,
  createTheme
} from '@mui/material/styles';

const DatePickerComp = ({ onDateChange }) => {
  const defaultDate = dayjs().add(3, 'day'); // Default to 3 days in future
  const [selectedDate, setSelectedDate] = React.useState(defaultDate);

  const disabledDates = ['2025-07-20', '2025-07-22', '2025-08-01'];

  const handleDateChange = (newValue) => {
    setSelectedDate(newValue);
    onDateChange?.(newValue);
  };

  const shouldDisableDate = (date) => {
    const isSunday = date.day() === 0;
    const isCustomDisabled = disabledDates.includes(date.format('YYYY-MM-DD'));
    return isSunday || isCustomDisabled;
  };
const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
  components: {
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: 'black', // calendar icon
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& fieldset': {
            borderColor: 'white',
          },
          '&:hover fieldset': {
            borderColor: 'white',
          },
          '&.Mui-focused fieldset': {
            borderColor: 'white',
          },
          '& input': {
            color: 'white', // <-- white date text
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: 'white', // label
        },
      },
    },
  },
});

  return (
    <ThemeProvider theme={lightTheme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker

          value={selectedDate}
          onChange={handleDateChange}
          minDate={defaultDate}
          shouldDisableDate={shouldDisableDate}
          className='bg-white rounded-lg'
          slotProps={{
            textField: {
              fullWidth: true,
              sx: {
                input: { color: 'white' }, 
                label: { color: 'white' }, 
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'white', // border color
                },  
              },
            },
          }}
        />
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default DatePickerComp;
