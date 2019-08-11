/* eslint-disable no-multi-spaces */
const modefullnames = [
  'team deathmatch',            // 0
  'coopedit',                   // 1
  'deathmatch',                 // 2
  'survivor',                   // 3
  'team survivor',              // 4
  'capture the flag',           // 5
  'pistol frenzy',              // 6
  'bot team deathmatch',        // 7
  'bot deathmatch',             // 8
  'last swiss standing',        // 9
  'one shot, one kill',         // 10
  'team one shot, one kill',    // 11
  'bot one shot, one kill',     // 12
  'hunt the flag',              // 13
  'team keep the flag',         // 14
  'keep the flag',              // 15
  'team pistol frenzy',         // 16
  'team last swiss standing',   // 17
  'bot pistol frenzy',          // 18
  'bot last swiss standing',    // 19
  'bot team survivor',          // 20
  'bot team one shot, one kill' // 21
]
const modes = [
  'TDM',    // 0
  'coop',   // 1
  'DM',     // 2
  'SURV',   // 3
  'TSURV',  // 4
  'CTF',    // 5
  'PF',     // 6
  'BTDM',   // 7
  'BDM',    // 8
  'LSS',    // 9
  'OSOK',   // 10
  'TOSOK',  // 11
  'BOSOK',  // 12
  'HTF',    // 13
  'TKTF',   // 14
  'KTF',    // 15
  'TPF',    // 16
  'TLSS',   // 17
  'BPF',    // 18
  'BLSS',   // 19
  'BTSURV', // 20
  'BTOSOK'  // 21
]

export const getMode = (n) => {
  return modes[n] || 'null'
}

export const getModeFullName = (n) => {
  return modefullnames[n] || 'null'
}

export const teamMode = (n) => {
  return (n === 0  ||
          n === 4  ||
          n === 5  ||
          n === 7  ||
          n === 11 ||
          n === 14 ||
          n === 16 ||
          n === 17 ||
          n === 20 ||
          n === 21)
}

export const flagMode = (n) => {
  return (n === 5  ||
          n === 13 ||
          n === 14 ||
          n === 15)
}
