<template>
    <div id="MinWidth" class="icon-collection">
        <p>Min Width</p>
        <select name="minWidth" id="MinWidth-Value">
            <option value="">500</option>
            <option value="">600</option>
            <option value="">700</option>
            <option value="">800</option>
            <option value="">900</option>
        </select>
    </div>
</template>

<script>
export default {

}
</script>

<style>
#MinWidth{
    color: #999;
    width: 80px;
    display: flex;
    justify-content: center;
    flex-direction: column;
}
#MinWidth p{
    white-space: pre-wrap;
    max-width: 100%;
    text-align: center;
    font-size: .7em;
}
#MinWidth select{
    margin: auto;
}
</style>