let selectedWorkoutId = null

// Loding workout list on the screen
displayWorkoutList()

/**
 * @description - Method to save or edit data
 * @returns
 */
function saveOrEditData() {
  const trackerDateElem = document.getElementById('tracker_date')
  const trackerSelectElem = document.getElementById('tracker_select')
  const trackerNumberElem = document.getElementById('tracker_number')

  // Checking if element does not exist.
  if (!trackerDateElem || !trackerSelectElem || !trackerNumberElem) {
    return alert(
      'We are facing an issue while taking your request. Please try again later'
    )
  }

  // Retriving values
  const trackerDateValue = trackerDateElem.value
  const trackerSelectValue = trackerSelectElem.value
  const trackerNumberValue = trackerNumberElem.value

  const handleErrorMessages = () => {
    // Obtaining error element
    const trackerDateErrElem = document.getElementById('datemsg')
    const trackerSelectErrElem = document.getElementById('selectmsg')
    const trackerNumberErrElem = document.getElementById('numbermsg')

    // Obtaining tracker data
    const trackerDateVal = document.getElementById('tracker_date')
    const trackerSelectVal = document.getElementById('tracker_select')
    const trackerNumberVal = document.getElementById('tracker_number')

    // Handling errors
    trackerDateErrElem.innerHTML = !trackerDateVal
      ? 'Please enter the date'
      : ''
    trackerSelectErrElem.innerHTML = !trackerSelectVal
      ? 'Please select the workout type'
      : ''
    trackerNumberErrElem.innerHTML = !trackerNumberVal
      ? 'Please select the time'
      : ''

    // Returing response
    return !trackerDateVal || !trackerSelectVal || !trackerNumberVal
  }

  const errResponse = handleErrorMessages()
  if (errResponse) {
    return
  }

  //Storing a data in localstore
  let arr = JSON.parse(localStorage.getItem('workoutTrack')) || []
  console.log('Ln 69', arr)

  //Edit
  if (selectedWorkoutId !== null) {
    //let arr = JSON.parse(localStorage.getItem('workoutTrack'))
    console.log('ln 42', arr)
    arr[selectedWorkoutId] = {
      workoutDate: trackerDateValue,
      workoutType: trackerSelectValue,
      workoutTime: trackerNumberValue,
    }
    selectedWorkoutId = null
  } else {
    arr.push({
      workoutDate: trackerDateValue,
      workoutType: trackerSelectValue,
      workoutTime: trackerNumberValue,
    })
  }
  localStorage.setItem('workoutTrack', JSON.stringify(arr))

  //Clearing form fields
  document.getElementById('tracker_date').value = ''
  document.getElementById('tracker_select').value = ''
  document.getElementById('tracker_number').value = ''
  displayWorkoutList()
}

//displayWorkoutList function
/**
 *
 */
function displayWorkoutList() {
  let arr = JSON.parse(localStorage.getItem('workoutTrack'))
  if (arr != null) {
    let html = ''
    let sno = 1
    for (let k = 0; k < arr.length; k++) {
      html =
        html +
        `<div class="table-row-data">
    <div class="tr-sr">${sno}</div>
    <div class="tr-date">${arr[k].workoutDate}</div>
    <div class="tr-workout">${arr[k].workoutType}</div>
    <div class="tr-duration">${arr[k].workoutTime}</div>
    <div class="edit_btn tr-edit"><a href="javascript:void(0)" onclick='editData(${k})'><i class="fa-solid fa-pen"></i></a></div>
    <div class="delete_btn tr-delete"><a href="javascript:void(0)" onclick='deleteData(${k})'><i class="fa-solid fa-trash-can"></i></a></div>
  </div>`
      sno++
    }
    document.getElementById('table-row-container').innerHTML = html
  }
}

//Edit Data

function editData(eid) {
  selectedWorkoutId = eid
  let arr = JSON.parse(localStorage.getItem('workoutTrack'))
  document.getElementById('tracker_date').value = arr[eid].workoutDate
  document.getElementById('tracker_select').value = arr[eid].workoutType
  document.getElementById('tracker_number').value = arr[eid].workoutTime
}

//Delete Data

function deleteData(rid) {
  let arr = JSON.parse(localStorage.getItem('workoutTrack'))
  arr.splice(rid, 1)
  localStorage.setItem('workoutTrack', JSON.stringify(arr))
  displayWorkoutList()
}
