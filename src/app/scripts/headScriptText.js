export const scriptText = `function innerLogic(myForm, editReason) {
  var editReasonBy = editReason + '_by';
  var mbi = myForm.getElementsByClassName('multi_block_input');
  mbi[0].checked = 'true';
  var qBox = myForm.getElementsByClassName('QueueBox');
  for (var i = 0; i < qBox.length; i++) {
    if (qBox[i].childNodes[1]) {
      if (qBox[i].childNodes[1].checked) {
        qBox[i].style.backgroundColor = '#dcdcc3';
      } else {
        qBox[i].style.backgroundColor = '';
      }
    }
  }
  var e_aName = 'edit_accept_block' + myForm.id.substring(2, 30);
  var e_aBlock = document.getElementById(e_aName);
  var m_bDiv = e_aBlock.getElementsByClassName('multi_block_div');
  var w_cChecker = 0;
  for (var i = 0; i < m_bDiv.length; i++) {
    if (m_bDiv[i].childNodes[1].value == '«Deny»') {
      m_bDiv[i].childNodes[1].value = editReason;
      if (m_bDiv[i].childNodes[1].value == '') {
        m_bDiv[i].childNodes[1].value = editReasonBy;
      }
    }
    if (
      m_bDiv[i].childNodes[1].value == editReason ||
      m_bDiv[i].childNodes[1].value == editReasonBy
    ) {
      w_cChecker = 1;
      break;
    }
  }
  if (w_cChecker == 0 && m_bDiv.length < 3) {
    m_bDiv[0].childNodes[3].click();
    m_bDiv[m_bDiv.length - 1].childNodes[1].value = editReason;
    if (m_bDiv[m_bDiv.length - 1].childNodes[1].value == '') {
      m_bDiv[m_bDiv.length - 1].childNodes[1].value = editReasonBy;
    }
  }
}
function addWrongCategory(w_cForm) {
  let duck_condition =
    w_cForm.getElementsByClassName('js-param js-condition')[0].lastElementChild.value ||
    w_cForm.getElementsByClassName('js-param js-condition_required')[0].lastElementChild
      .value;
  innerLogic(w_cForm, 'wrong_category');
  w_cForm.getElementsByClassName(
    'js-param js-condition'
  )[0].lastElementChild.value = duck_condition;
  w_cForm.getElementsByClassName(
    'js-param js-condition_required'
  )[0].lastElementChild.value = duck_condition;
}
function addTitleEdited(t_eForm) {
  innerLogic(t_eForm, 'title_edited');
}
function innerLogicRefuse(myForm, refuseReason) {
  let refuseReasonBy = refuseReason + '_by';
  let mbi = myForm.getElementsByClassName('multi_block_select')[0];
  mbi.checked = true;
  let qBox = myForm.getElementsByClassName('QueueBox');
  for (let i = 0; i < qBox.length; i++) {
    if (qBox[i].childNodes[1]) {
      if (qBox[i].childNodes[1].checked) {
        qBox[i].style.backgroundColor = '#dcdcc3';
      } else {
        qBox[i].style.backgroundColor = '';
      }
    }
  }
  let e_rName = 'refuse_block' + myForm.id.substring(2, 30);
  let e_rBlock = document.getElementById(e_rName);
  let m_bDiv = e_rBlock.getElementsByClassName('multi_block_div');
  let w_cChecker = 0;
  for (let i = 0; i < m_bDiv.length; i++) {
    if (m_bDiv[i].childNodes[1].value == '«Deny»') {
      m_bDiv[i].childNodes[1].value = refuseReason;
      if (m_bDiv[i].childNodes[1].value == '') {
        m_bDiv[i].childNodes[1].value = refuseReasonBy;
      }
    }
    if (
      m_bDiv[i].childNodes[1].value == refuseReason ||
      m_bDiv[i].childNodes[1].value == refuseReasonBy
    ) {
      w_cChecker = 1;
      break;
    }
  }
  if (w_cChecker == 0 && m_bDiv.length < 3) {
    m_bDiv[0].childNodes[3].click();
    m_bDiv[m_bDiv.length - 1].childNodes[1].value = refuseReason;
    if (m_bDiv[m_bDiv.length - 1].childNodes[1].value == '') {
      m_bDiv[m_bDiv.length - 1].childNodes[1].value = refuseReasonBy;
    }
  }
}
const refuseCompanyAdAsPrivate = formId =>
  innerLogicRefuse(formId, 'company_ad_as_private');
const refuse2Cabinets = formId => innerLogicRefuse(formId, '2_cabinets');
const falseSellerInformation = formId =>
  innerLogicRefuse(formId, 'false_seller_information');
const inactiveDuplicate = formId => innerLogicRefuse(formId, 'inactive_duplicate');
const duplicate = formId => innerLogicRefuse(formId, 'duplicate');`;
