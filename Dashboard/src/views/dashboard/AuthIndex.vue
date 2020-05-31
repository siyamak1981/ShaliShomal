<template>
  <v-app>
    <dashboard-core-view />
    <dashboard-core-settings />
  </v-app>
</template>

<script>
  export default {
    name: 'AuthIndex',
    components: {
      DashboardCoreSettings: () => import('./components/core/Settings'),
      DashboardCoreView: () => import('./components/core/View'),
    },

    data: () => ({
      expandOnHover: false,
    }),
  }
</script>
