export const keyboardMenu = {
  Type: 'keyboard',
  InputFieldState: 'hidden',
  DefaultHeight: false,
  BgColor: '#FFFFFF',
  Buttons: [
    {
      Columns: 6,
      Rows: 1,
      BgColor: '#2db9b9',
      BgLoop: true,
      ActionType: 'reply',
      ActionBody: '1',
      Text: 'Roll a dice!',
      TextVAlign: 'middle',
      TextHAlign: 'center',
      TextOpacity: 60,
      TextSize: 'regular'
    },
    {
      Columns: 6,
      Rows: 1,
      BgColor: '#2db9b9',
      BgLoop: true,
      ActionType: 'reply',
      ActionBody: '2',
      Text: 'Toss a coin!',
      TextVAlign: 'middle',
      TextHAlign: 'center',
      TextOpacity: 60,
      TextSize: 'regular'
    },
    {
      Columns: 6,
      Rows: 1,
      BgColor: '#2db9b9',
      BgLoop: true,
      ActionType: 'reply',
      ActionBody: '3',
      Text: 'Select a random place!',
      TextVAlign: 'middle',
      TextHAlign: 'center',
      TextOpacity: 60,
      TextSize: 'regular'
    }
  ]
};
