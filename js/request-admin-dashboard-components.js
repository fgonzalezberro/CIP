// Request Admin Dashboard Components
const requestAdminDashboardComponents = (componentUrl) =>{
  $.ajax({
    url: componentUrl,
    beforeSend: () =>{
      $(".loading-section").slideDown();
    },

    success: (data) =>{

      setTimeout(() =>{
        $(".loading-section").slideUp();
        $(".admin-main").html('');
        $(".admin-main").css("display","block");
        $(".admin-main").html(data);
      }, 2000);
    }
  });
}

export { requestAdminDashboardComponents };
