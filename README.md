# lisear
a jquery(Zepto) pulgin for input suggestion
#How To Use
##In html
``````html
<div class="lisear-container">
    <div class="lisear-input-area">
        <input type="search" placeholder="搜索" value=""/>
    </div>
    <ul class="lisear-list"></ul>
</div>
``````
##In javascript
``````javascript
$(".lisear-container").lisear({
    dataSourceUrl:"/tokyo/customer/searchkeywords",
    targetUrl:"/tokyo/customer/productlist"
});
``````
###OR
``````javascript
 $(".lisear-container").lisear({
     dataSource:['sdf','bbgh','br','bbttgh','btgbgh','bbgvh'],
     targetUrl:"/tokyo/customer/productlist"
 });
``````
