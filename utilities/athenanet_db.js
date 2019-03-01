class athenadbConnect {
  /**
  * Query the db data from athenanet
  * @param {String} query - select query string
  * @param {String} schema - practice name(default 11287)
  * @param {String} instance - db name(default ATEST3)
  * @returns query result as array of hashes
  */
  dbConnect(query, schema = '11287', instance = 'ATEST3') {
    var db_result = ''
    var credentials = { "uname": "qadevlabmachine", "pwd": "r1a4x8PS" };
    var wiki_url = "https://" + credentials["uname"] + ":" + credentials["pwd"] + "@intranet.athenahealth.com/wiki/node.esp?ID=124382";
    browser.newWindow(wiki_url, 'DBConnect');
    browser.waitUntil(function () {
      return (browser.element('[name="schema"]').isVisible())
    }, 999999);
    browser.element('[name="schema"]').setValue(schema);
    browser.element('[name="instance"]').setValue(instance);
    browser.element('[name="query"]').setValue(query);
    browser.element('[name="SUBMIT"]').click();
    db_result = browser.element('#results').getText();
    browser.switchTab();
    return JSON.parse(db_result);
  }
}

  export default new athenadbConnect()