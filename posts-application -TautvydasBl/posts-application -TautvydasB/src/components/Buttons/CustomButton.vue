
<template>
    <div>
        <router-link :to=location tag="button">{{text}}</router-link>
    </div>
</template>
  
<script>
  export default {
    props: ['text', 'location'],
  };
</script>
  