$(document).ready(function(){
    // Gets the Workflow select dropdown dependind on the workflow folders
    $('#workflow_list').ready(function() {
		$.get('/workflow', function(workflow_list){
			$('#workflow_list').html(workflow_list);
		});
    });
    
    // On selection of the work flow populates the corresponding feature list box 1
    $('#workflow_list').on('change', '#workflow_list_item', function() {
        let workflow_selected = $("#workflow_list_item option:selected").val();
        $.get('/workflow_feature?workflow_name=' + workflow_selected, function(workflow_sel){
		$('#workflow_feature').html(workflow_sel);
		});
    });

    // On clicking the Run Test button ,runs the test
    $('#generate').click(function(){
        let selected_items = $("#lstBox2 option").val();
        let workflow_selected = $("#workflow_list_item option:selected").val();
		$.get('/selected_feature?sel='+ workflow_selected+'&items='+selected_items);
    });
    
    // On clicking the View HTML Report button lauches the HTML report
    $('#html_report').click(function(){
        $.get('/html_result', function(report){
			$('#html_report').html(report);
        });
    });

    // On clicking the View Allure Report button lauches the Allure report
    $('#allure_report').click(function(){
        $.get('/allure_result');
    });
    
    // This method moves the selected list item between the list boxes
    function moveItems(origin, dest) {
        $(origin).find(':selected').appendTo(dest);
        }
    
    // This method moves all the list item between the list boxes
    function moveAllItems(origin, dest) {
        $(origin).children().appendTo(dest);
    }

    // Moves selected item from list box 2 to list box 1
    $('#btnLeft').on('click', function () {
        moveItems('#lstBox2', '#lstBox1');
    });

    // Moves selected item from list box 1 to list box 2
    $('#btnRight').on('click', function () {
        moveItems('#lstBox1', '#lstBox2');
    });

    // Moves all items from list box 2 to list box 1
    $('#btnAllLeft').on('click', function () {
        moveAllItems('#lstBox2', '#lstBox1');
    });

    // Moves all items from list box 1 to list box 2
    $('#btnAllRight').on('click', function () {
        moveAllItems('#lstBox1', '#lstBox2');
    });
});
