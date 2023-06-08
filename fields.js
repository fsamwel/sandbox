function loadFieldsList() {
  document.getElementById("fields").value = "";

  var responseObjectName = document.getElementById("searchType").value;

  var ajaxRequest = new XMLHttpRequest();
  ajaxRequest.onreadystatechange = function(){
    if(ajaxRequest.readyState == 4){
      if(ajaxRequest.status == 200){
        renderFieldSelectors(responseObjectName, ajaxRequest.responseText.split(/\r?\n/))
      } else {
        document.getElementById("selectors").innerHTML = "Status error: " + ajaxRequest.status;
      }
    }
  }

  ajaxRequest.open("GET", "https://raw.githubusercontent.com/BRP-API/Haal-Centraal-BRP-bevragen/master/features/fields-filtered-" + responseObjectName + ".csv", true);
  ajaxRequest.send();
}

function renderFieldSelectors(responseObjectName, fieldsList) {
  fieldsList.shift(); // kolomkop overslaan

  var selectors = document.getElementById("selectors");
  selectors.innerHTML = '<ul id="fields-tree" class="check-tree"></ul>';
  addTreeItem(fieldsList);
  hideUselessToggleButtons();
}

function addTreeItem(fieldsList) {
  if (fieldsList.length == 0) { return; }

  var field = fieldsList.shift();
  if (field=="") { addTreeItem(fieldsList); return; }

  var parent = document.getElementById("fields-tree");
  if (field.split('.').length > 1) { parent = document.getElementById(field.split('.').slice(0, -1).join('.') + '-list'); }

  li = document.createElement('li');
  li.innerHTML = `<input type="checkbox" id="${field}" onchange="click_item(this)"/>`;
  li.innerHTML += field.split('.').slice(-1);
  li.innerHTML += ` <button id="${field}-toggle" onclick="toggleGroupFields('${field}')" class="toggleButton">+</button>`;
  li.innerHTML += `<ul id="${field}-list" class="hidden"></ul>`;
  parent.appendChild(li);

  addTreeItem(fieldsList);
}

function hideUselessToggleButtons() {
  for (element of document.getElementById("fields-tree").getElementsByTagName("li")) {
    var id = element.getElementsByTagName("input")[0].id;
    if (document.getElementById(id + '-list').children.length == 0) {
      document.getElementById(id + '-toggle').classList.add("hidden");
    }
  }
}

function click_item(item) {
  setChildren(item);
  setParent(item);
  setFields();
}

function setChildren(item) {
  if (document.getElementById(item.id + "-list").children.length > 0)
  {
    for (child of document.getElementById(item.id + "-list").children) {
      child.getElementsByTagName("input")[0].checked = item.checked;
      child.getElementsByTagName("input")[0].indeterminate = false;
      setChildren(child.getElementsByTagName("input")[0])
    }
  }
}

function setParent(item) {
  if (item.id.split('.').length < 2) { return; }

  parentId = item.id.split('.').slice(0, -1).join('.');
  parent = document.getElementById(parentId);

  determineCheckStatus(parent);

  setParent(parent);
}

function determineCheckStatus(item) {
  var checked = 0;
  var notChecked = 0;

  for (child of document.getElementById(item.id + "-list").children) {
    if (child.getElementsByTagName("input")[0].checked == true) { 
      checked += 1; 
    } else if ( child.getElementsByTagName("input")[0].indeterminate == true) {
      checked += 1;
      notChecked += 1;
    } else {
      notChecked += 1;
    }
  }

  if (checked > 0 && notChecked == 0) {
    item.checked = true;
    item.indeterminate = false;
    return;
  }
  if (checked > 0 && notChecked > 0) {
    item.checked = false;
    item.indeterminate = true;
    return;
  }

  // checked == 0;
  item.checked = false;
  item.indeterminate = false;
}

function setFields() {
  fields = [];

  elements = document.getElementById("fields-tree").getElementsByTagName("input");
  for (element of elements) {
    if (element.id.split('.').length > 1) {
      parentId = element.id.split('.').slice(0, -1).join('.');
      if (document.getElementById(parentId).checked == true) { continue; }
    }

    if (element.checked == true) { fields.push(element.id); }
  };

  document.getElementById("fields").value = JSON.stringify(fields);
}

function toggleGroupFields(group) {
  var list = document.getElementById(group + '-list');
  var toggleButton = document.getElementById(group + '-toggle');
  if (list.classList.contains('hidden')) {
    list.classList.remove('hidden');
    toggleButton.innerHTML = '-';
  } else {
    list.classList.add('hidden');
    toggleButton.innerHTML = '+';
  }
}
